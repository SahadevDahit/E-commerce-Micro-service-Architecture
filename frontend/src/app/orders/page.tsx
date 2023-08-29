"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerOrder from './components/customerOrders'
import { Table, Pagination, Row, Col } from "react-bootstrap";
import { Container, Form, Button, Dropdown } from "react-bootstrap";

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
  const [role, setRole] = useState<string>('');
  const [todayOrdersStats, settodayOrdersStats] = useState<any>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.server}/shopping/v1/orders/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        setOrders(response?.data?.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    getRole();
  }, []);
  useEffect(() => {
    if (role === "seller") {
      productsOrderStats();
      console.log(todayOrdersStats)
    }
  }, [role])

  const handleRowClick = (orderNumber: string) => {
    window.location.href = `/orders/${orderNumber}`;
  };
  const productsOrderStats = async () => {
    try {
      const response = await axios.get(`${process.env.server}/shopping/v1/orders/sales/stats/seller`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
      settodayOrdersStats(response?.data?.saleToday)
    } catch (error) {
      console.log(error);
    }
  };

  const getRole = async () => {
    try {
      const response = await axios.get(`${process.env.server}/users/v1/getRole`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
      setRole(response.data.role)
    } catch (error) {
      console.log(error);
    }
  };

  return (<>
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <h2 className="text-center">My Orders</h2>
    
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
            <tr key={order._id} onClick={() => handleRowClick(order._id)}>
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


    {role === 'seller' && (
      <div className='py-4 w-25 mx-auto'>
        <h2 className='text-center'>{`Today's Sale Statistics`}</h2>
        {todayOrdersStats ? (
          <div className='sale-stats'>
            <p>Average Sale: {todayOrdersStats[0]?.avgSale}</p>
            <p>Maximum Sale: {todayOrdersStats[0]?.maxSale}</p>
            <p>Minimum Sale: {todayOrdersStats[0]?.minimumSale}</p>
            <p>Total Sales: {todayOrdersStats[0]?.totalSales}</p>
          </div>
        ) : (
          <p>Loading today s sale stats...</p>
        )}
      </div>
    )}
    <div>
      {role === 'seller' ? <CustomerOrder /> : <></>}
    </div>
  </>
  );
};

