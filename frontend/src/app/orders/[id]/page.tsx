"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Image from 'next/image';

interface PageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PageProps) {
  const [order, setOrder] = useState<any>();
  const [seller, setSeller] = useState<any>();
  const [product, setProduct] = useState<any>();
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/shopping/v1/orders/order/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        setOrder(response.data.order);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const getProductByID = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/products/v1/${order.productId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getSellerByID = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/users/v1/businessInfo/${order.sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        setSeller(response.data.businessFound);
      } catch (error) {
        console.log(error);
      }
    };
    const getCustomerByID = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/users/v1/sellerProfile/${order.orderedBy}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        setCustomer(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (order !== undefined) {
      getProductByID();
      getSellerByID();
      getCustomerByID();
    }
  }, [order]);

  return (
    <div className="container-fluid d-sm-inline-block d-md-flex justify-content-center align-items-center">
      <div className="card-container">
        <div>
          <h2 className="text-center">Orders Details</h2>
          <Card style={{ marginBottom: '1rem' }}>
            <Card.Body>
              <Card.Title>Order Number: {order?.orderNumber}</Card.Title>
              <Card.Text>
                Ordered At: {order?.orderedAt}
                <br />
                Currency: {order?.currency}
                <br />
                Discount: {order?.discount}
                <br />
                Total Price: {order?.totalPrice}
                <br />
                Payment Status: {order?.paymentStatus}
                <br />
                Status: {order?.status}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <h2 className="text-center">Seller Details</h2>
          <Card style={{ width: '18rem' }}>
            <Image src={seller?.logoUrl} alt="" width={150} height={150} />
            <Card.Body>
              <Card.Title>Name: {seller?.name}</Card.Title>
              <Card.Text>Address: {seller?.address}</Card.Text>
              <Card.Text>Email: {seller?.email}</Card.Text>
              <Card.Text>Contact: {seller?.contact}</Card.Text>
              <Card.Link href={seller?.website}>Website</Card.Link>
            </Card.Body>
          </Card>
        </div>
        <hr />
        <div>
          <h2 className="text-center">Customer Details</h2>
          <Card style={{ width: '18rem' }}>
            <Image src={customer?.profileImage} alt="" width={150} height={150} />
            <Card.Body>
              <Card.Title>Name: {customer?.name}</Card.Title>
              <Card.Text>Email: {customer?.email}</Card.Text>
              <Card.Text>Gender: {customer?.gender}</Card.Text>
              <Card.Text>Contact: {customer?.phoneNumber}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <hr />
        <div>
          <h2 className="text-center">Product Details</h2>
          <Card style={{ width: '18rem' }} className="mt-5">
            <Image src={product?.images} alt="" width={150} height={150} />
            <Card.Body>
              <Card.Title>{product?.name}</Card.Title>
              <Card.Text>Category: {product?.category}</Card.Text>
              <Card.Text>Subcategory: {product?.subCategory}</Card.Text>
              <Card.Text>Brand: {product?.brand}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <style jsx>{`
        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
