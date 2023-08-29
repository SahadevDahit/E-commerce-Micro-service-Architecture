"use client"
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import { RootState } from "../redux_Toolkit/store/Store";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux_Toolkit/slices/searchAttributesSlice";
import axios from "axios";
import ApparelAndFashion from "./categoryDetails/apparelAndFashion";
import ConsumerElectronics from "./categoryDetails/consumerElectronics";
import Books from "./categoryDetails/books";
interface userInfo {
  name: string;
  gender: string;
  dob: string;
  profileImage: string;
  email: string;
  phoneNumber: number;
}
export default function ProductsDetails() {
  const SearhAttributes = useSelector(
    (state: RootState) => state.searchAttributes
  );
  const [user, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [business, setBusiness] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/products/v1/${SearhAttributes.productId}`
        );
        setProducts(response.data);
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
    getReviews();
  }, []);
  const getReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.server}/shopping/v1/reviews/product/${SearhAttributes.productId}`
      );

      // Retrieve the review array from the response
      const reviews = response.data.reviews;

      // Create an array to store the updated reviews with user information
      const updatedReviews = [];

      // Fetch user information for each review
      for (const review of reviews) {
        // Fetch user details based on userId
        const userResponse = await axios.get(
          `${process.env.server}/users/v1/${review.userId}`
        );

        // Extract the user information from the response
        const user = userResponse.data.user;
        // Add the user information to the review object
        const updatedReview = { ...review, name: user.name, profileImage: user.profileImage };

        // Add the updated review to the updatedReviews array
        updatedReviews.push(updatedReview);
      }

      // Set the updated reviews state
      setReviews(updatedReviews);
    } catch (error: any) {
      console.log(
        error.response?.data?.message ||
        "Error occurred while fetching products"
      );
    }
  };

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const response = await axios.get(
          `${process.env.server}/users/v1/businessInfo/${products.sellerId}`
        );
        setBusiness(response.data.businessFound);
      } catch (error: any) {
        console.log(
          error.response?.data?.message ||
          "Error occurred while fetching products"
        );
      }
    };
    if (products !== undefined || products.length > 0) {
      getBusiness();
    }
  }, [products]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value); // Parse the input value as an integer
    setQuantity(value); // Update the quantity state
  };

  const addToCart = async (productId: string) => {
    await axios
      .post(
        `${process.env.server}/products/v1/carts/`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        alert("Successfully added to your cart");
      })
      .catch((error: any) => {
        alert(error.response.data.message);
      });

  };

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let review = { rating, message };
    try {
      const response = await axios.post(
        `${process.env.server}/shopping/v1/reviews/${SearhAttributes.productId}`,
        review,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      getReviews();
      alert(response.data.message);
    } catch (error: any) {
      console.log(
        error.response?.data?.message ||
        "Error occurred while adding reviews"
      );
      alert(error.response?.data?.message);
    }
  };

  if (products.length === 0) return <></>;

  return (
    <>
      <Container className="my-1">
        <Button onClick={(e) => dispatch(setField({ index: 1 }))}>
          Back
        </Button>
        <Card>
          <Row>
            <Col md={4}>
              <Image
                src={products?.images}
                alt="title"
                width={200}
                height={150}
              />
            </Col>
            <Col md={5}>
              <Card.Body>
                <Card.Title>Name: {products?.name}</Card.Title>
                <Card.Text>Price: NPR {products?.price}</Card.Text>
                <Card.Text>Quantity Available: {products?.qtyLeft}</Card.Text>
                <Card.Text>Category: {products?.category}</Card.Text>
                <Card.Text>
                  Sub Category: {products?.subCategory}
                </Card.Text>
                <Card.Text>
                  {products?.brand ? (
                    <Card.Text>Brand: {products?.brand}</Card.Text>
                  ) : (
                    ""
                  )}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col md={3}>
              <Card.Body>
                <div className="m-2">
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      className="form-control mr-2 w-50"
                      min="1"
                      defaultValue="1"
                      onChange={handleQuantityChange}
                    />
                    <Button
                      className="ms-2"
                      variant="primary"
                      onClick={() => {
                        const productId = SearhAttributes.productId;
                        addToCart(productId);
                      }}
                    >
                      Add To Cart
                    </Button>
                  </div>
                  <br />
                  <Button
                    variant="primary"
                    href={`/${SearhAttributes.productId}`}
                    className="my-1"
                  >
                    Proceed To Buy
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        <hr />
        <h4>Rating</h4>
        <hr />
        <div className="d-flex justify-content-around">
          <div>
            <h4>More Details</h4>
            {products?.apparelAndFashion ? (
              <ApparelAndFashion details={products?.apparelAndFashion} />
            ) : (
              <></>
            )}
            {products?.consumerElectronics ? (
              <ConsumerElectronics details={products?.consumerElectronics} />
            ) : (
              <></>
            )}
            {products?.books ? (
              <Books details={products?.books} />
            ) : (
              <></>
            )}
          </div>
          <div>
            <Card className="container p-3">
              <h3 className="text-center">Business Info/Seller Info</h3>
              <Image
                src={business?.logoUrl}
                width={200}
                height={100}
                alt=""
              />
              <Card.Body>
                <Card.Title>name: {business?.name}</Card.Title>
                <Card.Text>address: {business?.address}</Card.Text>
                <Card.Text>contact: {business?.contact}</Card.Text>
                <Card.Text>
                  businessEmail: {business?.businessEmail}
                </Card.Text>
                <Card.Text>website: {business?.website}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <hr />
        <div className="container-fluid">
          <h4>Description</h4>
          <p>{products.description}</p>
        </div>
        <hr />
        <h4>Reviews</h4>
        <div className="d-sm-block d-md-flex justify-content-around">
          <div className="w-50">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="ratingDropdown">
                <Form.Label>Select Rating:</Form.Label>
                <Form.Control
                  as="select"
                  required={true}
                  value={rating}
                  onChange={(event) =>
                    handleRatingSelect(parseInt(event.target.value))
                  }
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="valueInput">
                <Form.Label>Review message</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="m-2"
              >
                Review
              </Button>
            </Form>
          </div>
          <div className="w-50">
            <div>
              <h3 className="text-center">Reviews</h3>
              {reviews?.map((review: any) => {
                return (<>
                  <hr />
                  <div className="w-75 py-1 text-center" key={review._id}>
                    <h4>Rating: {review.rating}</h4>
                    <div className="d-flex align-items-center justify-content-center">
                      <Image src={review.profileImage} alt="Profile" width={50} height={50} />
                      <div className="ms-2">
                        <h6>{review.name}</h6>
                        <p>{review.message}</p>
                      </div>
                    </div>
                  </div>
                </>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

