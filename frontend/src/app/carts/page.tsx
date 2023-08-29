"use client"
import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import Image from "next/image";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    images: string;
  };
  quantity: number;
}

export default function Cart(): JSX.Element {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getCarts = async () => {
      try {
        const response = await axios.get<{ carts: CartItem[] }>(
          `${process.env.server}/products/v1/carts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setCarts(response?.data?.carts);
        console.log(response?.data?.carts);

        // Calculate total products and total price
        let totalPrice = 0;
        response?.data?.carts.forEach((cartItem) => {
          totalPrice += cartItem.quantity * cartItem.productId.price;
        });
        setTotalPrice(totalPrice);
      } catch (error) {
        console.log(error);
      }
    };
    getCarts();
  }, []);

  const handleQuantityChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(event.target.value, 10);
    const updatedCarts = [...carts];
    if (!isNaN(value)) {
      updatedCarts[index].quantity = value;
    } else {
      updatedCarts[index].quantity = 0;
    }
    setCarts(updatedCarts);
  };

  const handleUpdateQuantity = async (_id: string, quantity: number) => {
    try {
      const response = await axios.put(
        `${process.env.server}/products/v1/carts/${_id}`,
        { _id, updatedQuantity: quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      alert(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCartItem = async (_id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.server}/products/v1/carts/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response?.data?.message);
      // Remove the item from the carts state
      const updatedCarts = carts.filter((cart) => cart._id !== _id);
      setCarts(updatedCarts);
    } catch (error) {
      console.log(error);
    }
  };
const buyAll=async () => {
  const filteredCarts = carts.filter((cart) => cart.quantity > 0);
  const remainedCarts = carts.filter((cart) => cart.quantity===0);
  try {
    const response = await axios.post(
      `${process.env.server}/products/v1/orderCartItems`,
      filteredCarts,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const failedCartItems = response?.data?.failedCartItems;
    setCarts([...remainedCarts,...failedCartItems]);
    alert(response?.data?.message);
  } catch (error) {
    console.log(error);
    alert("unable to handle buy all products")
  }


}
  if (carts.length === 0) {
    return <>No products in your carts</>;
  }

  return (
    <>
      {carts.length > 0 ? (
        carts.map((cart: any, index: number) => (
          <div key={cart._id}>
            <hr />
            <div className="w-100 py-3 d-flex justify-content-evenly">
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    src={cart?.productId?.images}
                    alt="title"
                    width={150}
                    height={100}
                  />
                </div>
                <div className="ms-3">
                  <Card.Body>
                    <Card.Title>{cart?.productId?.name}</Card.Title>
                    <Card.Text>NPR {cart?.productId?.price}</Card.Text>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Quantity:</span>
                      <Form.Control
                        type="number"
                        min={1}
                        value={carts[index]?.quantity || 0}
                        onChange={(event:any) =>
                          handleQuantityChange(event, index)
                        }
                        style={{ width: "70px" }}
                      />
                      <Button
                        variant="primary"
                        className="ms-2"
                        onClick={() =>
                          handleUpdateQuantity(
                            cart._id,
                            carts[index]?.quantity
                          )
                        }
                      >
                        Update
                      </Button>
                    </div>
                  </Card.Body>
                </div>
              </div>
              <div>
                <Button
                  variant="primary"
                  className="me-2"
                  href={`/${cart?.productId?._id}`}
                >
                  Proceed To Buy
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleRemoveCartItem(cart._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
          
        ))
      ) : (
        <p>No products found in your cart.</p>
      )}
     
     {/* Display total products and total price */}
      <div className="w-50 mx-auto py-4">
        <h4>Total Products: {carts.length}</h4>
        <h4>Total Price: {totalPrice}</h4>
        <Button variant="primary" className="float-end pb-3" onClick={buyAll}>Buy All</Button>
      </div>
      <hr />
    </>
  );
}
