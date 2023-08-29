"use client"
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { updateBusinessField } from "../../redux_Toolkit/slices/businessInfoSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux_Toolkit/store/Store"; // Import the RootState type

export default function Home() {
  const businessRecord = useSelector((state: RootState) => state.businessInfo); // Access the signup state from Redux store

  const dispatch = useDispatch();
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    
    if (name === 'logo') {
      // Check if a file is selected
      if (files && files.length > 0) {
        const file = files[0];
        const validFormats = ['image/jpeg', 'image/png'];
        const isValidFormat = validFormats.includes(file.type);
        
        if (!isValidFormat) {
          // Display an error message or perform other validation handling
          alert("Only JPG, PNG, and JPEG formats are allowed.");
          return;
        }
      }
    }
    
    dispatch(updateBusinessField({ ...businessRecord, [name]: value }));
  };

  return (
    <Container>
      <h5 className="text-center">Business Details</h5>
      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>*Name</Form.Label>
        <Form.Control
          placeholder="Business Name"
          required={true}
          value={businessRecord.name}
          name="name"
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>*Email</Form.Label>
          <Form.Control
            type="email"
            required={true}
            name="businessEmail"
            value={businessRecord.businessEmail}
            placeholder="Enter email"
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="website"
            value={businessRecord.website}
            name="website"
            onChange={handleFieldChange}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>*Address</Form.Label>
        <Form.Control
          placeholder="1234 Main St"
          value={businessRecord.address}
          required={true}
          name="address"
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="Contact">
          <Form.Label>*Contact</Form.Label>
          <Form.Control
            type="Number"
            required={true}
            placeholder=""
            value={businessRecord.contact}
            name="contact"
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="pan">
          <Form.Label>*PAN</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="PAN"
            value={businessRecord.panNumber}
            name="panNumber"
            onChange={handleFieldChange}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={businessRecord.description}
          name="description"
          onChange={handleFieldChange}
        />
      </Form.Group>
    </Container>
  );
}
