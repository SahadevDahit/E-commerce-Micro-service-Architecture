import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Order from "../models/orders.js";



export const getAllordersCtrl = asyncHandler(async (req, res) => {
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
  
    if (req.query.orderNumber) {
    const nameRegex = new RegExp(req.query.orderNumber, "i");
      filter.orderNumber = nameRegex;
    }
  
    if (req.query.paymentStatus) {

      filter.paymentStatus = req.query.paymentStatus;
    }
  
    if (req.query.status) {
    const nameRegex = new RegExp(req.query.status, "i");
      filter.status = nameRegex;
    }
  
    const totalOrders = await Order.countDocuments(filter); // Get the total count of orders that match the filter
  
    const orders = await Order.find(filter)
      .skip(startIndex)
      .limit(limit);
  
    res.json({
      success: true,
      message: "All orders",
      orders,
      totalPages: totalOrders,
      currentPage: page,
    });
  });
  
export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const order = await Order.findById(id);
    //send response
    res.status(200).json({
        success: true,
        message: "Single order",
        order,
    });
});


export const updateOrderCtrlAdmin = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    //update
    const updatedOrder = await Order.findByIdAndUpdate(
        id, {
            status: req.body.status,
        }, {
            new: true,
        }
    );
    res.status(200).json({
        success: true,
        message: "Order updated",
        updatedOrder,
    });
});


export const getOrderStatsCtrl = asyncHandler(async (req, res) => {
    //get order stats
    const orders = await Order.aggregate([{
        $group: {
            _id: null,
            minimumSale: {
                $min: "$totalPrice",
            },
            totalSales: {
                $sum: "$totalPrice",
            },
            maxSale: {
                $max: "$totalPrice",
            },
            avgSale: {
                $avg: "$totalPrice",
            },
        },
    }, ]);
    //get the date
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([{
            $match: {
                createdAt: {
                    $gte: today,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "$totalPrice",
                },
                maxSale: {
                    $max: "$totalPrice",
                },
                avgSale: {
                    $avg: "$totalPrice",
                },
            },
        },
    ]);
    //send response
    res.status(200).json({
        success: true,
        message: "Sum of orders",
        orders,
        saleToday,
    });
});


//get order stats of the seller products of the day
export const getOrderStatsOFSeller = asyncHandler(async (req, res) => {
    //get order stats
    const userAuthId = req.headers['user-auth-id'];
    if(!userAuthId){
        throw new Error(`Login first required`)
    }
    const orders = await Order.aggregate([{
            $match: {
                sellerId: userAuthId
            }
        },
        {
            $group: {
                _id: null,
                minimumSale: {
                    $min: "$totalPrice",
                },
                totalSales: {
                    $sum: "$totalPrice",
                },
                maxSale: {
                    $max: "$totalPrice",
                },
                avgSale: {
                    $avg: "$totalPrice",
                },
            },
        },
    ]);
    //get the date
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([{
            $match: {
                createdAt: {
                    $gte: today,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "$totalPrice",
                },
            },
        },
    ]);
    //send response
    res.status(200).json({
        success: true,
        message: "order stats of seller's product",
        orders,
        saleToday,
    });
})

//get order of the user
export const getOrderByUser = asyncHandler(async (req, res) => {
    const userAuthId = req.headers['user-auth-id'];
    //get order by user
    const orders = await Order.find({
        orderedBy: userAuthId,
    });
    //send response
    res.status(200).json({
        success: true,
        message: "order fetched sucessfull",
        orders
    });
})


//get order of the customers list
export const getOrdersOfCustomers = asyncHandler(async (req, res) => {
    const userAuthId = req.headers['user-auth-id'];
    //get order by user
    const orders = await Order.find({
        sellerId: userAuthId,
    });
    //send response
    res.status(200).json({
        success: true,
        message: "order fetched sucessfull",
        orders
    });
})