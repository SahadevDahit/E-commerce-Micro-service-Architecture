"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { updateBusinessField } from "../../redux_Toolkit/slices/businessInfoSlice";
import { RootState } from "../../redux_Toolkit/store/Store"; // Import the RootState type
import Image from "next/image";
import {
  setNotifyMessage,
  setModalShow,
} from "../../redux_Toolkit/slices/notifySlice";
export default function Home() {
  const dispatch = useDispatch();
  const businessRecord = useSelector((state: RootState) => state.businessInfo); // Access the signup state from Redux store

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateBusinessField({ ...businessRecord, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios
        .put(`${process.env.server}/users/v1/updateBusiness`, businessRecord, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          dispatch(setNotifyMessage("Sucessfully updated...."));
          dispatch(setModalShow(true));
        });
    } catch (error: any) {
      dispatch(setNotifyMessage(error.response.data.message));
      dispatch(setModalShow(true));
      console.log(error);
    }
  };

  return (
    <Container>
      <h5 className="text-center">Business Details</h5>
      <Form className="w-50 p-3 mx-auto" onSubmit={handleSubmit}>
        <div className="text-center">
          <Image
            src={businessRecord?.logoUrl}
            alt="Image"
            className="rounded-circle"
            width={200}
            height={200}
          />
        </div>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>*Name</Form.Label>
          <Form.Control
            placeholder="Business Name"
            value={businessRecord?.name}
            name="name"
            required={true}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>*Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
            required={true}
              value={businessRecord?.businessEmail}
              name="businessEmail"
                        onChange={handleFieldChange}

            />
          </Form.Group>

          <Form.Group as={Col} controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="website"
              value={businessRecord?.website}
              name="website"
                          onChange={handleFieldChange}

            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>*Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            required={true}
            value={businessRecord?.address}
            name="address"
                        onChange={handleFieldChange}

          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="Contact">
            <Form.Label>*Contact</Form.Label>
            <Form.Control
              type="Number"
              placeholder=""
              value={businessRecord?.contact}
              name="contact"
            required={true}
            onChange={handleFieldChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="pan">
            <Form.Label>*PAN</Form.Label>
            <Form.Control
              type="text"
              placeholder="PAN"
            required={true}
              value={businessRecord?.panNumber}
              name="panNumber"
            onChange={handleFieldChange}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={businessRecord?.description}
            name="description"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </Container>
  );
}
