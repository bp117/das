import React from "react";
import {
  Row,
  Col,
  Alert
} from 'react-bootstrap';

const SectionError = (props) => {
  const {
    message = 'Something went wrong, please try again later',
    show = false
  } = props;

  if(!show){
    return null;
  }

  return (
    <Row>
      <Col className="mt-30">
        <Alert variant="danger">{message}</Alert>
      </Col>
    </Row>
  );
};

export default SectionError;
