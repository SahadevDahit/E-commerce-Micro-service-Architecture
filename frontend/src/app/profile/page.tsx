"use client";
import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Business from "./components/businessDetails";
import BasicDetails from "./components/basicDetails";
import ChangePassword from "./components/password";
import ShippingAddress from "./components/shippingAddress";
import MyVerticallyCenteredModal from "../components/notification";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux_Toolkit/store/Store"; // Import the RootState type
import {
  setNotifyMessage,
  setModalShow,
} from "../redux_Toolkit/slices/notifySlice";
import { setShippingAddress } from "../redux_Toolkit/slices/shippingAddressSlice";
import { updateBusinessField } from "../redux_Toolkit/slices/businessInfoSlice";
import { useRouter } from "next/navigation";
import { setProfileData } from "../redux_Toolkit/slices/profileInfoSlice";

import axios from "axios";
export default function PaymentForm() {
  const notification = useSelector((state: RootState) => state.notify);
  const dispatch = useDispatch();
  const router = useRouter();
  const[role,setRole]=useState<string>("")
  useEffect(() => {
    const fetch_profile_Info = async () => {
      try {
        axios
          .get(`${process.env.server}/users/v1/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            dispatch(setProfileData(response?.data?.user));
            dispatch(setShippingAddress(response?.data?.user?.shippingAddress))
            dispatch(updateBusinessField(response?.data?.user?.business))
            setRole(response?.data?.user?.role)
          });
      } catch (error: any) {
        router.push('/');
        console.log(error);
      }
    };
    fetch_profile_Info();
  }, []);

  return (
    <>
      <Container>
        <h3 className="text-center pt-3">My Profile</h3>
        <hr />
        <BasicDetails />
        <hr />
        <h5 className="text-center pt-3">Change Password</h5>
        <ChangePassword />
        <hr />
        <ShippingAddress />
        <hr />
        {role==="seller"?<Business />:""}
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
