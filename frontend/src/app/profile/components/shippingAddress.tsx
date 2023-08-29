"use client";
import React, { FormEvent, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../redux_Toolkit/slices/shippingAddressSlice";
import { RootState } from "../../redux_Toolkit/store/Store";
import axios from "axios";
import {
  setNotifyMessage,
  setModalShow,
} from "../../redux_Toolkit/slices/notifySlice";

export default function ShippingAddress() {
  const dispatch = useDispatch();
  const shippingAddress = useSelector(
    (state: RootState) => state.shippingAddress
  );


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios
        .put(
          `${process.env.server}/users/v1/shippingAddress`,
          shippingAddress,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          dispatch(
            setNotifyMessage("Sucessfully updated the shippingAddress....")
          );
          dispatch(setModalShow(true));
          console.log(response);
        });
    } catch (error: any) {
      dispatch(setNotifyMessage(error.response.data.message));
      dispatch(setModalShow(true));
      console.log(error);
    }
  };
  const handleAdd = async () => {
    try {
      await axios
        .post(
          `${process.env.server}/users/v1/shippingAddress`,
          shippingAddress,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
        dispatch(setShippingAddress(response?.data?.shipping_address));
            
          dispatch(
            setNotifyMessage("Sucessfully added the shippingAddress....")
          );
          dispatch(setModalShow(true));
        });
    } catch (error: any) {
      dispatch(setNotifyMessage(error.response.data.message));
      dispatch(setModalShow(true));
      console.log(error);
    }
  };
  return (
    <>
      <Form className="w-50 p-3 mx-auto" onSubmit={handleSubmit}>
        <h5 className="w-50 p-3 mx-auto">Shipping Address</h5>
        <Form.Group controlId="Country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nepal"
            value={shippingAddress?.country}
            disabled={true}
            style={{ width: "100%" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Province</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={shippingAddress?.province}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(
                setShippingAddress({
                  ...shippingAddress,
                  province: event.target.value,
                })
              );
            }}
          >
            <option>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={shippingAddress?.city}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              dispatch(
                setShippingAddress({
                  ...shippingAddress,
                  city: event.target.value,
                })
              )
            }
          >
            <option>Select</option>
            <option value="Dhangadhi">Dhangadhi</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="Zip Code">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Zip Code"
            style={{ width: "100%" }}
            value={shippingAddress?.zipCode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(
                setShippingAddress({
                  ...shippingAddress,
                  zipCode: event.target.value,
                })
              )
            }
          />
        </Form.Group>
        <Form.Group controlId="Street Name">
          <Form.Label>Street Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Street Name"
            style={{ width: "100%" }}
            value={shippingAddress?.streetName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(
                setShippingAddress({
                  ...shippingAddress,
                  streetName: event.target.value,
                })
              )
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-end mt-3">
          {shippingAddress._id !== "" ? (
            <Button variant="primary" type="submit">
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add
            </Button>
          )}
        </div>
      </Form>
    </>
  );
}
