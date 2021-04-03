import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col lg="12" xl="12">
          <div className="copyright text-center text-xl-center text-muted">
            <span className="font-weight-bold ml-1">Tamleek Home</span>{" "}© {new Date().getFullYear()}
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
