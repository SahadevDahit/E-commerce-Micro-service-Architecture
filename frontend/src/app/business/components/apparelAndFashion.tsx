import React, { ChangeEvent } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setConsumerElectronicsField,
  addDesignFeature,
  removeDesignFeature,
  addSize,
  removeSize,
} from "../redux-toolkit/slices/apparelAndFashion";
import { RootState } from "../../redux_Toolkit/store/Store";

const ConsumerElectronicsForm: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.apparelAndFashion);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setConsumerElectronicsField({ [name]: value } as any));
  };

  const handleAddDesignFeature = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(addDesignFeature(event.target.value));
  };

  const handleRemoveDesignFeature = (index: number) => {
    dispatch(removeDesignFeature(index));
  };

  const handleAddSize = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(addSize(event.target.value));
  };

  const handleRemoveSize = (index: number) => {
    dispatch(removeSize(index));
  };

  return (
    <>
      <Row>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Design Features:
            </Form.Label>
            <Col xs={8}>
              <Form.Select
                name="design"
                value=""
                onChange={handleAddDesignFeature}
              >
                <option>Select features</option>
                <option value="design1">design1</option>
                <option value="design2">design2</option>
                <option value="design3">design3</option>
              </Form.Select>

              {formState?.designFeatures.map((feature, index) => (
                <Form.Group
                  controlId={`feature${index}`}
                  className="row"
                  key={index}
                >
                  <Form.Label column sm="3"></Form.Label>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      value={feature}
                      readOnly
                      plaintext
                    />
                  </Col>
                  <Col sm="3">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveDesignFeature(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Form.Group>
              ))}
            </Col>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Sizes:
            </Form.Label>
            <Col xs={8}>
              <Form.Select name="sizes" value="" onChange={handleAddSize}>
                <option>Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </Form.Select>
              {formState?.sizes.map((size, index) => (
                <Form.Group
                  controlId={`size${index}`}
                  className="row"
                  key={index}
                >
                  <Form.Label column sm="3"></Form.Label>
                  <Col sm="6">
                    <Form.Control type="text" value={size} readOnly plaintext />
                  </Col>
                  <Col sm="3">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveSize(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Form.Group>
              ))}
            </Col>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default ConsumerElectronicsForm;
