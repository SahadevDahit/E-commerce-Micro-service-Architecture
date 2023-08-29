"use client"
import SignUp from "../components/signUp";
import Page from "../page";
import ForgotPassword from "../components/forgotPassword";
import MyVerticallyCenteredModal from "../../components/notification";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux_Toolkit/store/Store"; // Import the RootState type

import {
  setNotifyMessage,
  setModalShow,
} from "../../redux_Toolkit/slices/notifySlice";

interface page {
  params: {
    slug: string;
  };
}
export default function PostPage({ params }: page) {
  const notification = useSelector((state: RootState) => state.notify);
  const dispatch = useDispatch(); // Get the dispatch function

  return (
    <>
      {params.slug === "forgotPassword" ? (
        <ForgotPassword />
      ) : params.slug === "signup" ? (
        <SignUp />
      ) : (
        <Page />
      )}
       <MyVerticallyCenteredModal
        show={notification.modalShow}
        onHide={()=>{dispatch(setModalShow(false));}}
        message={notification.notifyMessage}
      />
    </>
  );
}
