import asyncHandler from "express-async-handler";
import Product from "../models/products.js";
import sendToQueue from "../rabbitmq/sendToQueue.js";
import Cart from "../models/carts.js";

// Controller function to get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const page = Math.abs(parseInt(req.query.page)) || 1; // Current page number (default: 1)
  let limit = Math.abs(parseInt(req.query.limit));
  const userAuthId = req.get("user-auth-id");
  if (limit > 10) {
    limit = 10; // Number of products per page (default: 10)
  }
  const startIndex = (page - 1) * limit; // Calculate the starting index of products
  const endIndex = page * limit; // Calculate the ending index of products

  const filter = {}; // Object to store filter criteria

  if (req.query.sellerId) {
    filter.sellerId = userAuthId;
  }

  if (req.query.name) {
    const nameRegex = new RegExp(req.query.name, "i");
    filter.name = nameRegex;
  }

  if (req.query.category) {
    const nameRegex = new RegExp(req.query.category, "i");
    filter.category = nameRegex;
  }

  if (req.query.subCategory) {
    const nameRegex = new RegExp(req.query.subCategory, "i");
    filter.subCategory = nameRegex;
  }

  if (req.query.status) {
    const nameRegex = new RegExp(req.query.status, "i");
    filter.status = nameRegex;
  }

  if (req.query.brand) {
    filter.brand = req.query.brand;
  }
  if (req.query.colors) {
    const colors = req.query.colors.split(","); // Assuming colors are comma-separated
    const colorRegex = colors.map((color) => new RegExp(color, "i")); // Use case-insensitive regex for each color
    filter.colors = { $in: colorRegex };
  }
  if (req.query.minPrice) {
    filter.price = { $gte: parseInt(req.query.minPrice) };
  }

  if (req.query.maxPrice) {
    if (filter.price) {
      filter.price.$lte = parseInt(req.query.maxPrice);
    } else {
      filter.price = { $lte: parseInt(req.query.maxPrice) };
    }
  }

  const totalProducts = await Product.countDocuments(filter); // Count the total number of products based on the filter criteria

  const products = await Product.find(filter)
    .populate("books")
    .populate("apparelAndFashion")
    .populate("consumerElectronics")
    .skip(startIndex)
    .limit(limit);

  const pagination = {}; // Object to store pagination information

  if (endIndex < totalProducts) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  res.json({
    products: products,
    pagination: pagination,
  });
});

// Controller function to get a product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "books apparelAndFashion consumerElectronics"
  );
  if (!product) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }
  res.json(product);
});

// Controller function to create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
});

// Controller function to update a product by ID
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }
  res.json(product);
});

// Controller function to delete a product by ID
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }
  res.json({
    message: "Product deleted",
  });
});

//place new order
export const placeOrder = asyncHandler(async (req, res) => {
  const userAuthId = req.get("user-auth-id");
  if (!userAuthId || userAuthId === "undefined") {
    throw new Error("Login first to place order");
  }
  req.body.orderedBy = userAuthId;
  const product = await Product.findById(req.body.productId);
  if (product.sellerId.equals(userAuthId)) {
    throw new Error("You cannot place an order for your own product");
  }
  let qtyLeft = parseInt(product.qtyLeft);
  let totalSold = parseInt(product.totalSold);
  const quantityOrdered = parseInt(req.body.quantityOrdered);
  if (qtyLeft <= 0) {
    throw new Error("Quantity of products unavailable");
  }
  if (qtyLeft < quantityOrdered) {
    throw new Error("Total Quantity Exceeds");
  }
  if (product) {
    totalSold += quantityOrdered;
    product.totalSold = totalSold;
  }
  const queueName = "order";
  sendToQueue(req.body, queueName);
  await product.save();

  res.json({
    message: "Order placed sucessfully",
  });
});

export const placeOrderOfCartItem = asyncHandler(async (req, res) => {
  const userAuthId = req.get("user-auth-id");
  if (userAuthId === "undefined") {
    return res.status(400).json({ message: "Login first to place an order" });
  }
  const failedCartItems = [];
  const orders = Object.values(req.body); // Convert orders object to an array
  for (let order of orders) {
    const product = await Product.findById(order.productId._id);
    const quantityOrdered = parseInt(order.quantity);
    if (product) {
      let qtyLeft = parseInt(product.qtyLeft);
      let totalSold = parseInt(product.totalSold);
      if (
        !product.sellerId.equals(userAuthId) &&
        qtyLeft > 0 &&
        qtyLeft > quantityOrdered
      ) {
        totalSold += quantityOrdered;
        product.totalSold = totalSold;

        const queueName = "order";
        const totalOrder = {
          orderedBy: userAuthId,
          productId: product.id,
          sellerId: product.sellerId,
          quantityOrdered,
          coupon: "",
          price: product.price,
        };

        await Cart.findByIdAndDelete(order._id);
        sendToQueue(totalOrder, queueName);
        await product.save();
      } else {
        failedCartItems.push(order);
      }
    }
  }

  res.json({
    message: "Orders placed successfully that are availabble",
    failedCartItems,
  });
});
