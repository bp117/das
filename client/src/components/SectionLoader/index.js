import React from "react";
import {
  Row,
  Col
} from 'react-bootstrap';
import "./style.scss";

const SectionLoader = () => {
  return (
    <Row>
      <Col className="mt-30">
        <div className="spinnerContainer d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SectionLoader;
