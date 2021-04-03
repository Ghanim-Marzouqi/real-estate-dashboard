import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthFooter from "components/Footers/AuthFooter.js";

// pages
import Login from '../views/pages/Login.js';
import Register from '../views/pages/Register.js';

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <div className="header bg-gradient-info pb-8">
          <Container>
            <div className="header-body text-center mb-1 pt-5">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <img src={require("assets/img/logo.png").default} alt="Logo" />
                  <h1 style={{ fontSize: 50 }} className="text-white">Tamleek Home</h1>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              <Route path="/auth/login" component={Login} />
              <Route path="/auth/register" component={Register} />
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
