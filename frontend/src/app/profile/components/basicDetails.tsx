"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux_Toolkit/store/Store";
import {
  setNotifyMessage,
  setModalShow,
} from "../../redux_Toolkit/slices/notifySlice";
import { useRouter } from 'next/navigation';
import { setField } from "../../redux_Toolkit/slices/searchAttributesSlice";
import { setProfileData } from "../../redux_Toolkit/slices/profileInfoSlice";
import Cookie from 'cookie-universal'
const cookies = Cookie()
interface profileInfo {
  name: string;
  gender: string;
  dob: string;
  profileImage: string;
  email: string;
  phoneNumber: number;
}
export default function BasicDetails() {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state: RootState) => state.profileInfo);
  const searchAttributes = useSelector((state: RootState) => state.searchAttributes);

  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(setProfileData({ ...profileInfo, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, profileImage, ...filteredprofileInfo } = profileInfo;
    try {
      await axios
        .put(`${process.env.server}/users/v1/profile`, filteredprofileInfo, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          dispatch(setNotifyMessage("Sucessfully updated the profile...."));

          dispatch(setModalShow(true));
        });
    } catch (error: any) {
      dispatch(setNotifyMessage(error.response.data.message));

      dispatch(setModalShow(true));
    }
  };
  const handleLogout = () => {
    cookies.remove('token')
    localStorage.removeItem('token');
    dispatch(setField({ "refresh": !searchAttributes.refresh }));
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <div className="text-right float-end pt-3 pe-3">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>

      </div>
      <Form className="w-50 p-3 mx-auto" onSubmit={handleSubmit}>
        <div className="text-center">
          <Image
            src={profileInfo?.profileImage}
            alt="Image"
            className="rounded-circle"
            width={200}
            height={200}
          />
        </div>

        <Form.Group controlId="userName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="User Name"
            value={profileInfo.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={profileInfo.email}
            disabled={true}
            style={{ width: "100%" }}
          />
        </Form.Group>
        <Form.Group controlId="New phoneNumber">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="Number"
            name="phoneNumber"
            placeholder="Enter valid new phone no"
            style={{ width: "100%" }}
            value={profileInfo.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={profileInfo.gender}
            name="gender"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(
                setProfileData({ ...profileInfo, gender: event.target.value })
              );
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="Dob">
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="Date"
            placeholder="dob"
            style={{ width: "100%" }}
            value={profileInfo.dob}
            name="dob"
            onChange={handleChange}
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
