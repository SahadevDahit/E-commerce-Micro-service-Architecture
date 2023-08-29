"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

interface MyVerticallyCenteredModalProps extends ModalProps {
  onHide: () => void;
  message: string;
}

export default function MyVerticallyCenteredModal(
  props: MyVerticallyCenteredModalProps
) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="text-center">{props.message}</h2>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
