import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-2">
        <Container>
          <Row>
            <Col lg={12} xl="12" className="text-center">
              <div className="copyright text-center text-xl-center text-muted">
                <span className="font-weight-bold ml-1">Tamleek Home</span>{" "}© {new Date().getFullYear()}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
