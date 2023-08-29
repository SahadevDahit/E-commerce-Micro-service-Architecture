"use client"
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Card, Col, Row, Button } from "react-bootstrap";
import { setField } from "../redux_Toolkit/slices/searchAttributesSlice";
import { RootState } from "../redux_Toolkit/store/Store";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./productList"
import axios from "axios"
const SearchProducts = () => {
  const SearhAttributes = useSelector((state: RootState) => state.searchAttributes);
  const [subCategory, setsubCategory] = useState<any>([]);
  const [Brands, setBrands] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/products/v1/category/${SearhAttributes.category}`
        );
        setsubCategory(response.data.subCategory);
        setBrands(response.data.brands);

      } catch (err: any) {
        console.log(err);
      }
    }
    getCategories();

  }, [SearhAttributes.category]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setField({ [name]: value }));
  };

  return (
    <>
      <div className="w-100 pt-3 d-sm-inline-block d-md-flex justify-justify-content-between">
        <Container className="container w-50 ps-3">
          <Form className="p-3 py-3 border border-1">
            <Form.Group controlId="category" className="py-4">
              <Row>
                <Col>
                  <Form.Label>Category:- {SearhAttributes.category}</Form.Label>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="subCategory" className="row py-2">
              <Form.Label column sm="3">
                Subcategory
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  name="subCategory"
                  value={SearhAttributes?.subCategory}
                  onChange={handleChange}
                >
                  <option value="">All</option>

                  {subCategory?.map((sub_category: any) => {
                    return (
                      <option key={sub_category._id} value={sub_category.name}>
                        {sub_category.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group controlId="brand" className="row py-2">
              <Form.Label column sm="3">
                Brand
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  name="brand"
                  value={SearhAttributes?.brand}
                  onChange={handleChange}
                >
                  <option value="">All</option>

                  {Brands?.map((brand: any) => {
                    return (
                      <option key={brand._id} value={brand.name}>
                        {brand.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group controlId="color" className="row py-2">
              <Form.Label column sm="3">
                Color
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="colors"
                  maxLength={50}
                  name="colors"
                  value={SearhAttributes.colors}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="minPrice" className="row py-2">
              <Form.Label column sm="3">
                Min Price
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  placeholder="minPrice"
                  name="minPrice"
                  value={SearhAttributes.minPrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value, name } = e.target
                    if (parseInt(value) > (SearhAttributes.maxRange)) {
                      alert("minPrice Range exceeds the maximum price range")
                    } else {
                      dispatch(setField({ [name]: value }))
                    }
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="maxPriceRange" className="row py-2">
              <Form.Label column sm="3">
                Max Price Range
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  placeholder="minPrice"
                  name="maxRange"
                  value={SearhAttributes.maxRange}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>Max Price: {SearhAttributes.maxPrice}</Form.Label>
              <Form.Control
                type="range"
                min={SearhAttributes.minPrice}
                max={SearhAttributes.maxRange}
                name="maxPrice"
                onChange={handleChange}

              />
            </Form.Group>
          </Form>
        </Container>
        <ProductList />
      </div>


    </>
  );

}
export default SearchProducts;