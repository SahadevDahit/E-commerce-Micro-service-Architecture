"use client";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./page.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux_Toolkit/store/Store";
import { setField } from "./redux_Toolkit/slices/searchAttributesSlice";
import axios from "axios";
const NavbarComponent = () => {
  const [categories, setCategories] = useState<any>([]);
  const SearhAttributes = useSelector((state: RootState) => state.searchAttributes);
  const [role, setRole] = useState<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    getRoles();
  }, [])


  useEffect(() => {
      getRoles();
  }, [SearhAttributes.refresh]);
  const setIndex = (index: number) => {
    dispatch(setField({ "index": index }));
  };
  const getRoles = async () => {
    try {
      const response = await axios.get(
        `${process.env.server}/users/v1/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
      );
      setRole(response?.data?.user?.role);
    } catch (err: any) {
      console.log(err);
      setRole(null);
    }
  }
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.server}/products/v1/category/`);
      setCategories(response.data);
    } catch (err: any) {
      console.log(err);
    }
  };
  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setField({ index: 1 }));
    dispatch(setField({ [name]: value }));
  };

  return (
    <>
      <Navbar expand="lg" id={styles.nav}>
        <Container fluid>
          <div className="w-5">
            <Navbar.Brand href="/" onClick={() => setIndex(0)}>E-Store</Navbar.Brand>
          </div>
          <div className="d-md-flex d-sm-block">
            <Dropdown className="me-3">
              <Dropdown.Toggle id={styles.category}>{SearhAttributes.category != "" ? SearhAttributes.category : "All"}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { dispatch(setField({ category: "" })); dispatch(setField({ subCategory: "" })); dispatch(setField({ brand: "" })); dispatch(setField({ index: 1 })) }}>All</Dropdown.Item>
                {categories?.map((category: any, index: number) => {
                  return (
                    <Dropdown.Item key={category._id} name="category" onClick={() => { dispatch(setField({ category: category.name })); dispatch(setField({ index: 1 })) }}>
                      {category.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Form className="align-items-center">
              <Form.Control
                type="search"
                placeholder="Search"
                name="name"
                maxLength={50}
                aria-label="Search"
                value={SearhAttributes.name}
                onChange={searchProduct}
                id={styles.searchBar}
              />
            </Form>
          </div>
          <div className="w-20 d-flex align-items-center justify-content-around">
            <Nav.Link id={styles.link} href="/">
              Home
            </Nav.Link>
            {role === "admin" ?
              <Nav.Link id={styles.link} href="/admins">
                Admins
              </Nav.Link> : <></>}
            {role === 'seller' ?
              <Nav.Link id={styles.link} href="/business">
                Business
              </Nav.Link> : <></>}
            {role !== null ? <>
              <Nav.Link id={styles.link} href="/orders">
                Orders
              </Nav.Link>
              <Nav.Link id={styles.link} href="/carts">
                Carts
              </Nav.Link></>
              : <> </>}
            <Nav.Link id={styles.link} href="/about">
              About
            </Nav.Link>
            {role === null ?
              <Nav.Link id={styles.link} href="/login">
                Login
              </Nav.Link> :
              <Nav.Link id={styles.link} href="/profile">
                Profile
              </Nav.Link>}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
