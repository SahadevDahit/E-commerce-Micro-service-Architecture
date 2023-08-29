"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import HeroSection from "./components/heroSection";
import SearchProducts from "./components/searchProducts";
import ProductDetails from "./components/productDetails";
import { SSRProvider } from "@react-aria/ssr";
import { useSelector } from "react-redux";
import { RootState } from "./redux_Toolkit/store/Store";

export default function DashBoard() {
  const SearhAttributes = useSelector((state: RootState) => state.searchAttributes);
   return (
    <SSRProvider>
      <>
        {SearhAttributes.index === 0 ? <HeroSection /> : SearhAttributes.index === 1 ? <SearchProducts /> 
        : SearhAttributes.index === 2 ? <ProductDetails /> : null}
      </>
    </SSRProvider>
  );
}
