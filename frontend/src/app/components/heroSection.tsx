"use client";
import Image from "next/image";
import styles from "../page.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { setField } from "../redux_Toolkit/slices/searchAttributesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HeroSection() {
  const [categories, setCategories] = useState<any>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/products/v1/category/`
        );
        setCategories(response.data);

      } catch (err: any) {
        console.log(err);
      }
    };
    getCategories();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <div className={styles.content}>
            <h2>This is some content above the centered image.</h2>
          </div>
          <Image
            src="/home.jpg"
            alt="Centered Image"
            width={1350}
            height={500}
          />
        </div>
      </div>
      {categories?.map((category: any,index:number) => <div key={category._id}>
        <h1 className="text-center">{category.name}</h1>
        <hr />
        
        <div className="d-sm-inline-block d-md-flex justify-content-evenly">
          {category?.subCategory?.map((subCategory: any) => <div key={subCategory._id} className="w-100">
            <Card style={{ width: "18rem" }} className="mx-1 container">
              <Nav.Link onClick={(e) => {
                dispatch(setField({ index: 1 }));
                dispatch(setField({ category: categories[index].name }));
                dispatch(setField({ subCategory: subCategory.name }));
              }}>
                <Image src={subCategory.image} alt="image" width={200} height={150} />
                <Card.Body>
                  <Card.Title>{subCategory.name}</Card.Title>
                </Card.Body>
              </Nav.Link>
            </Card>
          </div>)}
        </div>
      </div>)}
    </>
  );
}
