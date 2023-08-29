"use client";
import React, { useEffect, useState } from "react";
import ProductTable from "./components/products"
export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProducts] = useState<any[]>([]);

  return (
    <>
      <h1 className="text-center">Products</h1>
      <ProductTable />
     </>
  );
};

