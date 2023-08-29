"use client"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
const MyForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.server}/users/v1/feedbackAndReports/`,{title,message},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response?.data);
      alert(response?.data?.message);
    } catch (error: any) {
      console.log(
        error.response?.data?.message ||
        "Error adding feedback and reports"
      );
      alert(error?.response?.data?.message)
    };
  };

  return (
    <Container className="w-25 mx-auto pt-5">
      <h3 className='text-center'>Feedbacks
        and
        Reports
      </h3>
      <Form onSubmit={handleSubmit} className=''>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              maxLength={1000}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" className='float-end mt-3'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default MyForm;
