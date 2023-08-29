import React, { useState, useEffect } from 'react';
import { Form,Table, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface CouponFormData {
    code: string;
    startDate: string;
    endDate: string;
    discount: number;
}

const CouponForm: React.FC = () => {
    const [coupons,setCoupons] = useState<any[]>([]);
    const [formData, setFormData] = useState<CouponFormData>({
        code: '',
        startDate: '',
        endDate: '',
        discount: 0,
    });

    useEffect(() => {
        const getcoupons = async () => {
            await axios.get(`${process.env.server}/shopping/v1/coupons/`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((response) => {
                setCoupons(response.data.coupons);
            }).catch((error) => {
                console.log(error);
            });
        }
        getcoupons();

    }, [])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await axios
            .post(`${process.env.server}/shopping/v1/coupons`, formData,
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
                    "error in creating the coupon"
                );
                alert(error.response?.data?.message || "error in creating the coupon");
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        // Remove spaces from the input value
        const sanitizedValue = value.replace(/\s/g, '');

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: sanitizedValue,
        }));
    };

    return (
        <>
        <Form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
            <Form.Group as={Row} controlId="code">
                <Form.Label column sm={3}>
                    Coupon Name
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        placeholder="Enter coupon name"
                        required={true}
                        value={formData.code}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="startDate">
                <Form.Label column sm={3}>
                    Start Date
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="date"
                        required={true}
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="endDate">
                <Form.Label column sm={3}>
                    End Date
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="date"
                        required={true}
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="discount">
                <Form.Label column sm={3}>
                    Discount
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="number"
                        placeholder="Enter discount"
                        required={true}
                        value={formData.discount}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit" className="float-end">
                Add
            </Button>
        </Form>


        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Code</th>
          <th>Days Left</th>
          <th>Discount</th>
          <th>End Date</th>
          <th>Expired</th>
          <th>Start Date</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((coupon) => (
          <tr key={coupon._id}>
            <td>{coupon.code}</td>
            <td>{coupon.daysLeft}</td>
            <td>{coupon.discount}</td>
            <td>{coupon.endDate}</td>
            <td>{coupon.isExpired ? 'Yes' : 'No'}</td>
            <td>{coupon.startDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
        </>  
    );
};

export default CouponForm;
