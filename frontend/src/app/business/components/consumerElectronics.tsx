import React, { ChangeEvent, FormEvent } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setConsumerElectronicsState } from "../redux-toolkit/slices/consumerElectronics";
import { RootState } from "../../redux_Toolkit/store/Store";

const ConsumerElectronicsForm = () => {
  const dispatch = useDispatch();
  const formState = useSelector(
    (state: RootState) => state.consumerElectronics
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setConsumerElectronicsState({ ...formState, [name]: value } as any)
    );
  };

  return (
    <>
      <Row>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Sound:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="sound"
                value={formState.sound}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Battery:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="battery"
                value={formState.battery}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Storage:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="storage"
                value={formState.storage}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Chipset:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="chipset"
                value={formState.chipset}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Processor:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="processor"
                value={formState.processor}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Camera:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="camera"
                value={formState.camera}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Connectivity:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="connectivity"
                value={formState.connectivity}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Display:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="display"
                value={formState.display}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup as={Row}>
            <Form.Label column xs={4}>
              Operating System:
            </Form.Label>
            <Col xs={8}>
              <FormControl
                type="text"
                name="operatingSystem"
                value={formState.operatingSystem}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default ConsumerElectronicsForm;
