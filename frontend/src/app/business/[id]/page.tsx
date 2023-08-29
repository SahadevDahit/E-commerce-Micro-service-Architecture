"use client"
import React from "react";
import ProductsDetails from "../components/productDetails";

interface page {
  params: {
    id: string;
  };
}
const Page = ({ params }: page) => {
  return (
    <>
      <ProductsDetails id={params.id} />
    </>
  );
};

export default Page;
