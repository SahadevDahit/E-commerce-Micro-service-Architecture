"use client"
import Image from "next/image";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { RootState } from "../redux_Toolkit/store/Store";
import { Card, Col, Row, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux_Toolkit/slices/searchAttributesSlice";

const ProductList = () => {
    const [productList, setProducts] = useState<any[]>([]);
    const SearhAttributes = useSelector((state: RootState) => state.searchAttributes);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLength, setTotalLength] = useState<number>(0);
    const dispatch = useDispatch();
    const productPerPage: number = 5;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        const getProducts = async () => {
            try {

                const filter = {
                    name: "",
                    category: "",
                    subCategory: "",
                    brand: "",
                    colors: "",
                    minPrice: "",
                    maxPrice: "",
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
                if (SearhAttributes.colors !== "") {
                    filter.colors = SearhAttributes.colors;
                }
                if (SearhAttributes.minPrice) {
                    filter.minPrice = (SearhAttributes.minPrice).toString();
                }
                if (SearhAttributes.maxPrice) {
                    filter.maxPrice = (SearhAttributes.maxPrice).toString();
                }
                const params = new URLSearchParams(filter).toString();
                const response = await axios.get(`${process.env.server}/products/v1?${params}`);
                setProducts(response.data.products);
                setTotalLength(response.data.products.length);

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
            }, 1000);
        };

        debouncedGetProducts();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [SearhAttributes.name, SearhAttributes.category, SearhAttributes.subCategory, SearhAttributes.brand, SearhAttributes.minPrice, SearhAttributes.maxPrice, SearhAttributes.maxPrice, SearhAttributes.colors]);

    const totalPages = Math.ceil(totalLength / productPerPage);
    const lastIndex = currentPage * productPerPage;
    const firstIndex = lastIndex - productPerPage;
    const currentProductList = productList.slice(firstIndex, lastIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        // <div className="w-100" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <div className="w-100">
            {currentProductList.length > 0 ? (
                currentProductList.map((product) => (
                    <div className="w-50 py-3 d-sm-inline-block d-md-flex justify-content-evenly" key={product.id}>
                        <div className="" onClick={(e: any) => {
                            dispatch(setField({ index: 2 }))
                            dispatch(setField({ productId: product.id }))
                        }} style={{ cursor: "pointer" }}>
                            <Image src={product.images} alt="title" width={150} height={100} />
                        </div>
                        <div className="d-flex flex-column justify-content-center mx-2">
                            <Card.Body onClick={(e: any) => {
                                dispatch(setField({ index: 2 }))
                                dispatch(setField({ productId: product.id }))
                            }} style={{ cursor: "pointer" }}>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>NPR {product.price}</Card.Text>
                            </Card.Body>
                        </div>
                      
                    </div>

                ))
            ) : (
                <p>No products found.</p>
            )}
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
    );
}

export default ProductList;
