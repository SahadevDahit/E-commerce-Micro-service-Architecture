"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination, Row, Col } from "react-bootstrap";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../../redux_Toolkit/slices/searchAttributesSlice";
import { RootState } from "../../redux_Toolkit/store/Store";

const Products = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProducts] = useState<any[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const SearhAttributes = useSelector((state: RootState) => state.searchAttributes);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  const productPerPage: number = 5;
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${process.env.server}/products/v1?page=${currentPage}`);
        setTotalLength(response.data.products.length);
      } catch (error: any) {
        console.log(
          error.response?.data?.message ||
          "Error occurred while fetching products"
        );
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${process.env.server}/products/v1?page=${currentPage}&limit=${productPerPage}`);
        setProducts(response.data.products);
      } catch (error: any) {
        console.log(
          error.response?.data?.message ||
          "Error occurred while fetching products"
        );
      };
    }
    getProducts();
  }, [currentPage]);


  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const getProducts = async () => {
      try {

        const filter = {
          name: "",
          category: "",
          subCategory: "",
          brand: "",

        };
        if (SearhAttributes.category !== "") {
          filter.category = SearhAttributes.category;
        }
        if (SearhAttributes.subCategory !== "") {
          filter.subCategory = SearhAttributes.subCategory;
        }
        if (SearhAttributes.brand !== "") {
          filter.brand = SearhAttributes.brand;
        }
        if (SearhAttributes.name !== "") {
          filter.name = SearhAttributes.name;
        }

        const params = new URLSearchParams(filter).toString();
        const response = await axios.get(`${process.env.server}/products/v1/?${params}&page=${currentPage}&limit=${productPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
        setProducts(response.data.products);
      } catch (error: any) {
        console.log(
          error.response?.data?.message ||
          "Error occurred while fetching products"
        );
      }
    };
    const debouncedGetProducts = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        getProducts();
        timeoutId = null;
      }, 700);
    };

    debouncedGetProducts();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [SearhAttributes.name, SearhAttributes.category, SearhAttributes.subCategory, SearhAttributes.brand, SearhAttributes.minPrice, SearhAttributes.maxPrice, SearhAttributes.maxPrice, SearhAttributes.colors]);

 
  // Calculate total number of pages
  const totalPages = Math.ceil(totalLength / productPerPage);

  // Calculate index of the last item on the current page
  const lastIndex = currentPage * productPerPage;

  // Calculate index of the first item on the current page
  const firstIndex = lastIndex - productPerPage;

  // Get current page of productList
  const currentproductList = productList.slice(firstIndex, lastIndex);

  // Handle page change
  const handlePageChange = async(page: number) => {
    setCurrentPage(page);
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setField({ [selectedOption]: e.target.value }));
  };

  const handleDropdownSelect = (option: string) => {
    setSelectedOption(option);

  };
  return (
    <>
      <div className="container d-flex justify-content-between align-items-center py-3 ">
        <div>
          <Button
            variant="link"
            className="text-decoration-none"
            onClick={() => router.push(`/business/new`)}
          >
            + Add
          </Button>
        </div>
        <div>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="search">
                <Form.Control
                  type="text"
                  placeholder=""
                  name="search"
                  onChange={handleSearchInputChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Dropdown>
                  <Dropdown.Toggle>{selectedOption || "Filter"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownSelect("name")}>
                      Name
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect("category")}>
                      Category
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect("subCategory")}>
                      Sub Category
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect("brand")}>
                      Brand
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect("status")}>
                      Status
                    </Dropdown.Item>
                   
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Row>
          </Form>
        </div>
      </div>
      <div className="table-responsive container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Brand</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item) => (
              <tr
                key={item.id}
                onClick={() => router.push(`/business/${item.id}`)}
              >
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Products;
