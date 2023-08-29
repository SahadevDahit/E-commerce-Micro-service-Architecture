"use client"
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

interface Order {
  productId: string;
  sellerId: string;
  orderNumber: string;
  paymentStatus: string;
  paymentMethod: string;
  quantityOrdered: number;
  discount: number;
  totalPrice: number;
}

export default function OrderDetails() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.server}/shopping/v1/orders/orderOfCustomer`,
      {  headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        }}
        );
        setOrders(response.data.orders);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);
  const handleRowClick = (orderNumber: string) => {
    window.location.href = `/orders/${orderNumber}`;
  };
  return (<>
  <hr />    
  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
  <h2 className="text-center">Customer Orders</h2>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Payment Status</th>
        <th>Payment Method</th>
        <th>Quantity Ordered</th>
        <th>Discount</th>
        <th>Total Price</th>
      </tr>
    </thead>
    <tbody>
      {orders?.map((order: any) => (
        <tr key={order.orderNumber} onClick={() => handleRowClick(order._id)}>
          <td>{order.orderNumber}</td>
          <td>{order.paymentStatus}</td>
          <td>{order.paymentMethod}</td>
          <td>{order.quantityOrdered}</td>
          <td>{order.discount}</td>
          <td>{order.totalPrice}</td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>

    </>
  );
};

