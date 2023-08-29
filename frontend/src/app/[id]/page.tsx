"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import Image from "next/image";

interface page {
    params: {
        id: string;
    };
}
export default function Page({ params }: page) {
    const [products, setProducts] = useState<any>([]);
    const [business, setBusiness] = useState<any>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [totalPrice, settotalPrice] = useState<number>(0);
    const [coupon, setCoupon] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${process.env.server}/products/v1/${params.id}`);
                setProducts(response.data);
            } catch (error: any) {
                console.log(
                    error.response?.data?.message ||
                    "Error occurred while fetching products"
                );
            };
        }
        getProducts();
    }, []);

    useEffect(() => {
        const getBusiness = async () => {
            try {
                const response = await axios.get(`${process.env.server}/users/v1/businessInfo/${products.sellerId}`);
                setBusiness(response.data.businessFound);
            } catch (error: any) {
                console.log(
                    error.response?.data?.message ||
                    "Error occurred while fetching products"
                );
            };
        }
        if (products !== undefined || products.length > 0) {
            getBusiness();
        }
    }, [products])

    const order = {
        productId: "",
        sellerId: "",
        coupon: coupon,
        price: 0,
        orderedBy: "",
        quantityOrdered: 0
    }
    const placeOrder = async () => {
        order.quantityOrdered = quantity;
        order.price = products.price;
        order.productId = products.id;
        order.sellerId = products.sellerId;
        if (quantity > 0) {

           await axios
                .post(`${process.env.server}/products/v1/order`, order,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Access-Control-Allow-Origin": "*",
                        }
                    })
                .then((res) => {
                    alert(res.data.message);
                }).catch((
                    error: any
                ) => {
                    console.log(
                        error.response?.data?.message ||
                        "Error occurred while placing order"
                    );
                    alert(error.response?.data?.message)
                });
        } else {
            alert("Select at least one quantity to order");
            return;
        }

    }

    const validateCoupon = async () => {
        const sellerId = products.sellerId;
        await axios.post(`${process.env.server}/shopping/v1/coupons/validate`, { coupon, sellerId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",
            }
        }).then((response) => {
            const discount = response.data.couponFound.discount;
            setDiscount(discount);
            settotalPrice(totalPrice - (totalPrice * (discount / 100)));
            setIsDisabled(true)
        }).catch((error) => {
            console.log(
                error.response?.data?.message ||
                "Error occurred while validating coupon"
            );
            alert(error.response.data.message);
        })
    }


    if (products.length === 0)
        return (<></>)
    return (
        <>
            <div className="container">
                <Card>
                    <Row>
                        <Col md={4}>
                            <Image src={products.images} alt="title" width={200} height={150} />
                        </Col>
                        <Col md={5}>
                            <Card.Body>
                                <Card.Title>Name: {products.name}</Card.Title>
                                <Card.Text>Price: NPR {products.price}</Card.Text>
                                <Card.Text>Quantity Available: {products.qtyLeft}</Card.Text>
                                <Card.Text>Category: {products.category}</Card.Text>
                                <Card.Text>Sub Category: {products.subCategory}</Card.Text>
                                <Card.Text>{products.brand ? <Card.Text>Brand: {products.brand}</Card.Text> : ""}</Card.Text>
                            </Card.Body>
                        </Col>
                        <Col md={3}>
                            <Card.Body>
                                <Form.Group controlId="coupon" className="align-items-center">
                                    <Form.Label className="me-2">Coupon Code</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Coupon"
                                            onChange={(e) => { setCoupon(e.target.value); setDiscount(0); setIsDisabled(false) }}
                                            style={{ width: "100%" }}
                                        />

                                        <Button variant="primary" className="my-1 ms-2" onClick={validateCoupon} disabled={isDisabled}>
                                            Apply
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Card.Body>

                        </Col>
                    </Row>
                </Card>


                <div className="w-100 d-flex justify-content-around">
                    <div className="container w-25 mx-auto mt-5">

                        <Form.Group controlId="selectqty" className=" d-flex align-items-center">
                            <Form.Label className="me-2">Select quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="select quantity"
                                value={quantity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value > products.qtyLeft) {
                                        alert("select quantity less than available quantity");
                                    } else {
                                        setQuantity(value);
                                        if ((e.target.value).length !== 0) {
                                            const totalPrice = value * parseInt(products.price);
                                            settotalPrice(totalPrice);
                                        } else {
                                            settotalPrice(0);
                                        }

                                    }
                                }}

                            />
                        </Form.Group>
                        <Form.Group controlId="total" className=" py-2 align-items-center">
                            <Form.Label className="me-2">Discount % {discount}</Form.Label>
                            <Form.Label className="me-2">Discount Amount {(discount / 100) * totalPrice}</Form.Label>

                            <Form.Label className="me-2">Total Price: NPR {totalPrice}</Form.Label>
                        </Form.Group>

                        <Button variant="primary" className="my-1 float-end" onClick={placeOrder}>
                            Buy
                        </Button>
                    </div>
                    <div>
                        <Card className="container p-3">
                            <h3 className="text-center">Business Info/Seller Info</h3>
                            <Image src={business?.logoUrl} width={200} height={100} alt="" />
                            <Card.Body>
                                <Card.Title>name: {business?.name}</Card.Title>
                                <Card.Text>address: {business?.address}</Card.Text>
                                <Card.Text>contact: {business?.contact}</Card.Text>
                                <Card.Text>businessEmail: {business?.businessEmail}</Card.Text>
                                <Card.Text>website: {business?.website}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};








