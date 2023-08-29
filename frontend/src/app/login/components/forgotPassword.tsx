"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  setNotifyMessage,
  setModalShow,
} from "../../redux_Toolkit/slices/notifySlice";
interface FormData {
  newPassword: string;
  confirmPassword: string;
  email: string;
}
const fetchUserData = async () => {
  const response = await fetch("/api/auth/session");
  const data = await response.json();
  return data.user;
};
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
    email: "",
  });
  useEffect(() => {
      
    fetchUserData();

  },[]);
  useEffect(() => {
       const getUserData = async () => {
      const user = await fetchUserData();
      if (user === undefined) {
        router.push("/login");
        return;
      }
      setFormData({ ...formData, email: user.email });
    };
    getUserData();
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios
        .put(`${process.env.server}/users/v1/changePassword`, formData)
        .then((response) => {
          dispatch(setNotifyMessage("Sucessfully password changed...."));
          dispatch(setModalShow(true));
        });
    } catch (error: any) {
      dispatch(setNotifyMessage(error.response.data.message));
      dispatch(setModalShow(true));
    }
  };
  return (
    <>
      <Container>
        <h1 className="text-center pt-5">Change Password</h1>
        <Form
          className="w-50 mx-auto p-3 border  border-1 "
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="NewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              style={{ width: "100%" }}
              name="newPassword"
              required={true}
              value={formData.newPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              style={{ width: "100%" }}
              name="confirmPassword"
              required={true}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
