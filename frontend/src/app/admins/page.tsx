"use client";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FeedbacksAndReports from "./components/feedbackAndReports";
import Statistics from "./components/statistics";
import Orders from "./components/shopping";
import Products from "./components/products";
import Users from "./components/users";
export default function Admin() {
const [state,setState]=useState<number>(0)
  return (
    <>
   <div className=" w-100 d-flex justify-content-center mt-4">
        <Button className="mx-2 border border-primary" variant="primary" onClick={(e)=>{setState(0)}}>Users</Button>
        <Button className="mx-2 border border-primary" variant="primary" onClick={(e)=>{setState(1)}}>Products</Button>
        <Button className="mx-2 border border-primary" variant="primary" onClick={(e)=>{setState(2)}}>Shopping</Button>
        <Button className="mx-2 border border-primary" variant="primary" onClick={(e)=>{setState(3)}}>Feedback And Reports</Button>
    </div>

    {state===0?<Users />:state===1?<Products />:state===2?<Orders />:<FeedbacksAndReports/>}



    </>
  );
}
