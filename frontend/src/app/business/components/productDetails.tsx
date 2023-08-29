"use client";
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux_Toolkit/store/Store.jsx";
import Image from "next/image";
import {
  setField,
  removeColor,
  resetProductState,
  setProducts,
} from "../redux-toolkit/slices/productSlices";
import { resetBookState, setBooks } from "../redux-toolkit/slices/booksSlice";
import {
  resetConsumerElectronicsState,
  setconsumerElectronics,
} from "../redux-toolkit/slices/consumerElectronics";
import {
  resetapparelAndFashion,
  setapparelAndFashion,
} from "../redux-toolkit/slices/apparelAndFashion";
import Books from "./books";
import ConsumerElectronics from "./consumerElectronics";
import ApparelAndFashion from "./apparelAndFashion";
import axios from "axios";
interface ChildProps {
  id: string;
}
const ProductDetails = ({ id }: ChildProps) => {
  const [categories, setCategories] = useState<any>([]);
  const [subCategory, setsubCategory] = useState<any>([]);
  const [Brands, setBrands] = useState<any>([]);
  const [image, setimage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const productState = useSelector((state: RootState) => state.product);
  const consumerElectronics = useSelector(
    (state: RootState) => state.consumerElectronics
  );
  const apparelAndFashion = useSelector(
    (state: RootState) => state.apparelAndFashion
  );

  const books = useSelector((state: RootState) => state.books);

  const [colors, setColors] = useState<any>([
    { id: 1, color: "red" },
    { id: 2, color: "green" },
    { id: 3, color: "blue" },
    { id: 4, color: "yellow" },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/products/v1/${id}`
        );
        dispatch(setProducts(response.data));
        if (response.data.category === "books") {
          dispatch(setBooks(response.data.books));
        }
        if (response.data.category === "consumerElectronics") {
          dispatch(setconsumerElectronics(response.data.consumerElectronics));
        }
        if (response.data.category === "apparelAndFashion") {
          dispatch(setapparelAndFashion(response.data.apparelAndFashion));
        }
      } catch (error: any) {
        console.log(
          error.response?.data?.message ||
          "Error occurred while fetching categories by id"
        );
      }
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

  useEffect(() => {

    const categoryFound = categories.find(
      (element: any) => element.name === productState.category
    );
    setsubCategory(categoryFound?.subCategory);
    setBrands(categoryFound?.brands);
  }, [productState.category, categories]);
  const handleChangeCategory = (e: any) => {
    const { name, value } = e.target;
    dispatch(setField({ name, value }));
    dispatch(resetBookState());
    dispatch(resetapparelAndFashion());
    dispatch(resetConsumerElectronicsState());
    dispatch(resetProductState());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setField({ name, value }));
  };

  const handleRemoveColor = (color: string) => {
    dispatch(removeColor(color));
  };
  const updateProduct = async (event: any) => {

    if (productState.category !== "") {
      await axios
        .put(
          `${process.env.server}/products/v1/${productState.category}/`,
          productState,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert("sucessfully updated");
        })
        .catch((error: any) => {
          console.log(
            error.response?.data?.message ||
            "Error occurred while updating the product"
          );
        });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    const category = productState.category;
    let finalProduct;
    if (category === "books") {
      finalProduct = { ...productState, ...books };
    } else if (category === "consumerElectronics") {
      finalProduct = { ...productState, ...consumerElectronics };
    } else {
      finalProduct = { ...productState, ...apparelAndFashion };
    }
    // Create a new FormData object
    const formData = new FormData();
    formData.append("productImage", image[0]);

    // Append the properties of finalProduct to formData
    for (const key in finalProduct) {
      if (Object.prototype.hasOwnProperty.call(finalProduct, key)) {
        const value = (finalProduct as any)[key];
        formData.append(key, value);
      }
    }
    if (productState.category !== "") {
      await axios
        .post(
          `${process.env.server}/products/v1/${productState.category}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert("sucessfully added");

        })
        .catch((error: any) => {
          setIsLoading(true);
          console.log(error.message);
        });
    }
  };
  return (
    <>
      <h2 className="text-center">Product Details</h2>
      <Container className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          {id !== "new" ? (
            <div className="text-center my-2">
              <Image
                src={productState?.images}
                alt="Image"
                className=""
                width={300}
                height={200}
              />
            </div>
          ) : (
            <></>
          )}
          <Form.Group controlId="category" className="row">
            <Form.Label column sm="3">
              Category
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                as="select"
                name="category"
                required={true}
                disabled={id === "new" ? false : true}
                value={productState?.category}
                onChange={handleChangeCategory}
              >
                <option value="">Select a Category</option>

                {categories?.map((category: any, index: number) => {
                  return (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Control>
            </div>
          </Form.Group>
          <Form.Group controlId="subCategory" className="row">
            <Form.Label column sm="3">
              Subcategory
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                as="select"
                name="subCategory"
                disabled={id === "new" ? false : true}
                value={productState?.subCategory}
                onChange={handleChange}
              >
                <option>Select a subcategory</option>
                {subCategory?.map((sub_category: any) => {
                  return (
                    <option key={sub_category._id} value={sub_category.name}>
                      {sub_category.name}
                    </option>
                  );
                })}
              </Form.Control>
            </div>
          </Form.Group>
          <Form.Group controlId="name" className="row">
            <Form.Label column sm="3">
              Name
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="type"
                name="name"
                required={true}
                value={productState?.name}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="brand" className="row">
            <Form.Label column sm="3">
              Brand
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                as="select"
                name="brand"
                disabled={id === "new" ? false : true}
                value={productState?.brand}
                onChange={handleChange}
              >
                <option value="">Select a brand</option>

                {Brands?.map((brand: any) => {
                  return (
                    <option key={brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  );
                })}
              </Form.Control>
            </div>
          </Form.Group>
          {productState.category === "books" ? (
            <Books />
          ) : productState.category === "consumerElectronics" ? (
            <ConsumerElectronics />
          ) : (
            <ApparelAndFashion />
          )}
          <Form.Group controlId="status">
            <Form.Label>status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={productState.status}
              onChange={handleChange}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="row">
            <Form.Label column sm="3">
              *Price
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="number"
                name="price"
                required={true}
                value={productState?.price}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="quantityAvailable" className="row">
            <Form.Label column sm="3">
              *Quantity Available
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="number"
                required={true}
                name="totalQty"
                value={productState?.totalQty}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="soldQuantity" className="row">
            <Form.Label column sm="3">
              Sold Quantity
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                type="number"
                disabled={true}
                name="totalSold"
                value={productState?.totalSold}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="description" className="row">
            <Form.Label column sm="3">
              Description
            </Form.Label>
            <div className="col-sm-9">
              <Form.Control
                as="textarea"
                name="description"
                value={productState?.description}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          {id !== "new" ? (
            <></>
          ) : (
            <Form.Group controlId="image" className="row">
              <Form.Label column sm="3">
                Image
              </Form.Label>
              <div className="col-sm-9">
                <Form.Control
                  type="file"
                required={true}
                  accept="image/*"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.preventDefault();
                    setimage(event.currentTarget.files);
                  }}
                />
              </div>
            </Form.Group>
          )}
          <Form.Group controlId="colors" className="row">
            <Form.Label column sm="3">
              Colors
            </Form.Label>
            <Col sm="6">
              <Form.Control as="select" name="colors" onChange={handleChange}>
                <option value="">Select a color</option>
                {colors?.map(({ id, color }: any) => (
                  <option value={color} key={id}>
                    {color}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          {productState?.colors.map((color: string, index: number) => (
            <Form.Group controlId={`color${index}`} className="row" key={index}>
              <Form.Label column sm="3"></Form.Label>
              <Col sm="6">
                <Form.Control type="text" value={color} readOnly plaintext />
              </Col>
              <Col sm="3">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveColor(color)}
                >
                  Remove
                </Button>
              </Col>
            </Form.Group>
          ))}
          {id === "new" ? (
            <div className="row">
              <div className="col-sm-9 offset-sm-3">
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-9 offset-sm-3">
                <Button variant="primary" onClick={updateProduct}>
                  Update
                </Button>
              </div>
            </div>
          )}
        </Form>
      </Container>
    </>
  );
};

export default ProductDetails;
