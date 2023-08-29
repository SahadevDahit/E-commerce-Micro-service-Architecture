"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Container, Form, Button } from "react-bootstrap";
import Business from "../components/business";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setBusiness,
  setUserName,
  setEmail,
  setPhoneNo,
  setRole,
  setPassword,
  setConfirmPassword,
  setGender,
  setDob,
  setProfile,
} from "../../redux_Toolkit/slices/signUpSlice";
import { RootState } from "../../redux_Toolkit/store/Store"; // Import the RootState type
import axios from "axios";
import {
  setNotifyMessage,
  setModalShow,
} from "../../redux_Toolkit/slices/notifySlice";

const fetchUserData = async () => {
  const response = await fetch("/api/auth/session");
  const data = await response.json();
  return data.user;
};

export default function SignUp() {
  const router = useRouter();
  const [image, setimage] = useState<any>(null);
  const [loading, setLoading] = useState(false); // State to keep track of loading state

  const [recaptchaChecked, setRecaptchaChecked] =
    React.useState<boolean>(false); // State to keep track of ReCAPTCHA checkbox status
  const signup = useSelector((state: RootState) => state.signup); // Access the signup state from Redux store
  const businessRecord = useSelector((state: RootState) => state.businessInfo); // Access the signup state from Redux store

  const dispatch = useDispatch(); // Get the dispatch function
  const handleRecaptchaChange = (value: string | null) => {
    if (value) {
      setRecaptchaChecked(true);
    } else {
      setRecaptchaChecked(false);
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "business") {
      dispatch(setRole("seller"));
      dispatch(setBusiness(checked));
    }
  };
 useEffect(()=>{
  fetchUserData();
 },[])
  useEffect(() => {
    const getUserData = async () => {
      const user = await fetchUserData();
      setTimeout(() => {
      if (user === undefined) {
        router.push("/login");
        return;
      }
      dispatch(setProfile(user.image));
      dispatch(setUserName(user.name));
      dispatch(setEmail(user.email));
    },2000)
    };
    getUserData();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recaptchaChecked) {
      alert("Invalid recapcha");
      return;
    }
    if(signup.password!==signup.confirmPassword){
      alert("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("userName", signup.userName);
    formData.append("role", signup.role);
    formData.append("email", signup.email);
    formData.append("phoneNo", signup.phoneNo.toString());
    formData.append("password", signup.password);
    formData.append("confirmPassword", signup.confirmPassword);
    formData.append("gender", signup.gender);
    formData.append("dob", signup.dob);
    formData.append("profileImage", signup.profileImage);
    if (image!==null && image[0]!==null) {
      formData.append("name", businessRecord.name);
      formData.append("businessEmail", businessRecord.businessEmail);
      formData.append("website", businessRecord.website);
      formData.append("address", businessRecord.address);
      formData.append("contact", businessRecord.contact);
      formData.append("pan", businessRecord.panNumber);
      formData.append("description", businessRecord.description);
      formData.append("logo", image[0]);
    }
    setLoading(true); // Set loading state to true

    try {
      await axios.post(`${process.env.server}/users/v1/`, formData);
      if (signup.role === "customer") {
        dispatch(setNotifyMessage("Successfully account created"));
      } else {
        dispatch(
          setNotifyMessage(
            "Successfully account sent for verification. Wait until get verified"
          )
        );
      }
      dispatch(setModalShow(true));
      router.push("/login");
    } catch (error:any) {
      dispatch(setNotifyMessage(error.response.data.message));
      dispatch(setModalShow(true));
    } finally {
      setLoading(false); // Set loading state to false regardless of success or error
    }
  };

  return (
    <>
      <Container>
        <h3 className="text-center pt-3">Sign Up</h3>
        <Form
          className="w-50 p-3 mx-auto border  border-1 "
          onSubmit={handleSubmit}
        >
          <div className="d-flex justify-content-end">
            <Form.Check
              inline
              label="For Business"
              name="business"
              type="checkbox"
              onChange={handleCheckboxChange}
              id={`inline-checkbox-1`}
            />
          </div>
          <Form.Group controlId="userName">
            <Form.Label>*Name</Form.Label>
            <Form.Control
              type="text"
              required={true}
              placeholder="User Name"
              style={{ width: "100%" }}
              value={signup.userName}
              onChange={(event) => dispatch(setUserName(event.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>*Email address</Form.Label>
            <Form.Control
              type="email"
              required={true}
              placeholder="Enter email"
              style={{ width: "100%" }}
              value={signup.email}
              onChange={(event) => dispatch(setEmail(event.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="phoneNO">
            <Form.Label>*Phone No</Form.Label>
            <Form.Control
              type="Number"
              required={true}
              placeholder="Enter valid phone no"
              style={{ width: "100%" }}
              value={signup.phoneNo}
              onChange={(event) =>
                dispatch(setPhoneNo(Number(event.target.value)))
              }
            />
          </Form.Group>{" "}
          <Form.Group controlId="formPassword">
            <Form.Label>*Password</Form.Label>
            <Form.Control
              type="password"
              required={true}
              placeholder="Password"
              minLength={5}
              style={{ width: "100%" }}
              onChange={(event) => dispatch(setPassword(event.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>*Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required={true}
              placeholder="Confirm Password"
              minLength={5}
              style={{ width: "100%" }}
              onChange={(event) =>
                dispatch(setConfirmPassword(event.target.value))
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              required={true}
              aria-label="Default select example"
              value={signup.gender}
              onChange={(event) => dispatch(setGender(event.target.value))}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="Dob">
            <Form.Label>*DOB</Form.Label>
            <Form.Control
              type="Date"
              required={true}
              placeholder="DOB"
              style={{ width: "100%" }}
              value={signup.dob}
              onChange={(event) => dispatch(setDob(event.target.value))}
            />
          </Form.Group>
          <hr />
          {signup.business === true ? (
            <>
              <Business />
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type="file"
                  required={true}
                  accept="image/*"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.preventDefault();
                    setimage(event.currentTarget.files);
                  }}
                />
              </Form.Group>
            </>
          ) : (
            ""
          )}
          <ReCAPTCHA
            sitekey="6LejMCEmAAAAADDRHEzn72ULU9-XaoEpd77TEutj"
            onChange={handleRecaptchaChange}
          />
          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
