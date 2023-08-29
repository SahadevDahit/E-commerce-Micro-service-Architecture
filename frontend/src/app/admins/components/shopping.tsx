"use client"
import React, { useEffect, useState } from 'react';
import { Container,Pagination, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

interface Order {
  _id:string;
  productId: string;
  sellerId: string;
  orderNumber: string;
  paymentStatus: string;
  paymentMethod: string;
  quantityOrdered: number;
  discount: number;
  totalPrice: number;
}

interface Stats {
  avgSale: number;
  maxSale: number;
  minimumSale: number;
  totalSales: number;
}

export default function OrderDetails() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [todayOrdersStats, settodayOrdersStats] = useState<Stats[]>([]);
  const [totalOrdersStats, settotalOrdersStats] = useState<Stats[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState<number>(0);
  const productPerPage: number = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.server}/shopping/v1/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        setOrders(response?.data?.orders);
        setTotalLength(response?.data?.length)
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    productsOrderStats();
  }, []);

  const productsOrderStats = async () => {
    try {
      const response = await axios.get(`${process.env.server}/shopping/v1/orders/sales/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      settodayOrdersStats(response?.data?.saleToday);
      settotalOrdersStats(response?.data?.orders);
    } catch (error) {
      console.log(error);
    }
  };
  // Calculate total number of pages
  const totalPages = Math.ceil(totalLength / productPerPage);

  // Calculate index of the last item on the current page
  const lastIndex = currentPage * productPerPage;

  // Calculate index of the first item on the current page
  const firstIndex = lastIndex - productPerPage;

  // Get current page of productList
  const currentproductList = orders.slice(firstIndex, lastIndex);

  // Handle page change
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };
  const handleRowClick = (orderNumber: string) => {
    window.location.href = `/orders/${orderNumber}`;
  };
  return (
    <>

      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center py-3">
            {todayOrdersStats.length > 0 && (
              <>
                <h4>{`Today's Sale Stats`}</h4>
                <p>Average Sale: {todayOrdersStats[0].avgSale}</p>
                <p>Maximum Sale: {todayOrdersStats[0].maxSale}</p>
                <p>Minimum Sale: {todayOrdersStats[0].minimumSale}</p>
                <p>Total Sales: {todayOrdersStats[0].totalSales}</p>
              </>
            )}
          </Col>
          <Col md={6} className="text-center py-3">
            {totalOrdersStats.length > 0 && (
              <>
                <h4>Total Sale Stats</h4>
                <p>Average Sale: {totalOrdersStats[0].avgSale}</p>
                <p>Maximum Sale: {totalOrdersStats[0].maxSale}</p>
                <p>Minimum Sale: {totalOrdersStats[0].minimumSale}</p>
                <p>Total Sales: {totalOrdersStats[0].totalSales}</p>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <div className='pb-5' style={{ maxHeight: '500px', overflowY: 'auto' }}>

      <h2 className="text-center py-3">Orders</h2>
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
}