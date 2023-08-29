import React, { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../redux-toolkit/slices/booksSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
import { RootState } from "../../redux_Toolkit/store/Store";

const BookForm = () => {
  const bookState = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(setBook({ [name]: fieldValue } as any));
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={bookState.title}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={bookState.author}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="publisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              type="text"
              name="publisher"
              value={bookState.publisher}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="edition">
            <Form.Label>Edition</Form.Label>
            <Form.Control
              type="text"
              name="edition"
              value={bookState.edition}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={bookState.isbn}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="paperback">
            <Form.Label>Paperback</Form.Label>
            <Form.Control
              as="select"
              name="paperback"
              value={bookState.paperback ? "yes" : "no"}
              onChange={handleChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="noOfPage">
            <Form.Label>No. of Pages</Form.Label>
            <Form.Control
              type="number"
              name="noOfPage"
              value={bookState.noOfPage}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="language">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={bookState.language}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default BookForm;
