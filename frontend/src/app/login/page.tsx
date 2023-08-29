"use client";
import React from "react";
import { useState, useEffect, FormEvent } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import MyVerticallyCenteredModal from "../components/notification";
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../redux_Toolkit/slices/searchAttributesSlice";
import Cookie from "cookie-universal"
import { RootState } from "../redux_Toolkit/store/Store"; // Import the RootState type
import {
  setNotifyMessage,
  setModalShow,
} from "../redux_Toolkit/slices/notifySlice";

export default function Page() {
  const notification = useSelector((state: RootState) => state.notify);
  const searchAttributes = useSelector((state: RootState) => state.searchAttributes);
const cookies=Cookie();
  const dispatch = useDispatch(); // Get the dispatch function
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const SignUp = async () => {
    try {
      const response = await signIn("google", { callbackUrl: "/login/signup" });
      if (response?.error) {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const forgotPassword = async () => {
    try {
      const response = await signIn("google", {
        callbackUrl: "/login/forgotPassword",
      });
      if (response?.error) {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.server}/users/v1/login`, formData)
      .then((response) => {
        if (response.status === 200) {
          cookies.set("token", response.data.token);
          localStorage.setItem("token", response.data.token);
          dispatch(setNotifyMessage("Sucessfully login...."));
          dispatch(setModalShow(true));
        dispatch(setField({ "refresh": !searchAttributes.refresh }));
       router.push("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        dispatch(setNotifyMessage(error.response.data.message));
        dispatch(setModalShow(true));

      });
  };

  return (
    <>
      <Container>
        <h1 className="text-center pt-5">Login</h1>
        <Form
          onSubmit={handleSubmit}
          className="w-50 mx-auto p-3 border  border-1 "
        >
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              placeholder="Enter email"
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              placeholder="Password"
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
          <Button
            variant="link"
            className="float-end mt-3 text-decoration-none"
            onClick={forgotPassword}
          >
            Forgot Password??
          </Button>
          <Button
            variant="link"
            className="float-end mt-3 text-decoration-none"
            onClick={SignUp}
          >
            Sign Up with Google??
          </Button>
        </Form>
      </Container>
      <MyVerticallyCenteredModal
        show={notification.modalShow}
        onHide={() => {
          dispatch(setModalShow(false));
        }}
        message={notification.notifyMessage}
      />
    </>
  );
}
