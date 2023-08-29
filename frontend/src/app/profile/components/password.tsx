"use client";
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  setNotifyMessage,
  setModalShow,
} from "../../redux_Toolkit/slices/notifySlice";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export default function ChangePassword() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(formData.newPassword!==formData.confirmPassword){
      alert("new password and confirm password mismatch");
      return;
    }
    try {
      await axios
        .put(`${process.env.server}/users/v1/updatePassword`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          dispatch(setNotifyMessage("Sucessfully password updated...."));
          dispatch(setModalShow(true));
        });
    } catch (error: any) {
      dispatch(setNotifyMessage(error.response.data.message));
      dispatch(setModalShow(true));
    }
  };

  return (
    <>
      <Form className="w-50 p-3 mx-auto" onSubmit={handleSubmit}>
        <Form.Group controlId="oldPassword">
          <Form.Label>*Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            required={true}
            minLength={5}

            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Old Password"
            style={{ width: "100%" }}
          />
        </Form.Group>

        <Form.Group controlId="NewPassword">
          <Form.Label>*Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required={true}
            minLength={5}

            placeholder="New Password"
            style={{ width: "100%" }}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>*Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            required={true}
            minLength={5}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
            style={{ width: "100%" }}
          />
        </Form.Group>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </>
  );
}
