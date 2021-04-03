import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { register } from "../../services";

const Register = () => {

  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: ""
  });
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });

  const registerButtonHandler = async (e) => {

    e.preventDefault();

    if (!user.name || user.name === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "name cannot be empty"
      });
      return;
    }

    if (!user.email || user.email === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "email cannot be empty"
      });
      return;
    }

    if (!user.phone || user.phone === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "phone cannot be empty"
      });
      return;
    }

    if (!user.username || user.username === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "username cannot be empty"
      });
      return;
    }

    if (!user.password || user.password === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "password cannot be empty"
      });
      return;
    }

    const response = await register(user);
    console.log("response", response);

    if (response !== null) {

      if (response.status === "success") {
        setAlert({
          visible: true,
          color: "success",
          message: response.message
        });
        setTimeout(() => history.goBack(), 3000);
      } else if (response.status === "fail") {
        setAlert({
          visible: true,
          color: "danger",
          message: response.message
        });
      } else if (response.status === "error") {
        setAlert({
          visible: true,
          color: "danger",
          message: response.message
        });
      } else {
        setAlert({
          visible: true,
          color: "danger",
          message: "Server Error"
        });
      }
    } else {
      setAlert({
        visible: true,
        color: "danger",
        message: "Server Error"
      });
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-2">
            <Form role="form" className="mt-5">
              {alert.visible ?
                <Alert color={alert.color}>
                  {alert.message}
                </Alert> : null
              }
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    autoComplete="new-name"
                    required
                    onChange={e => setUser({ ...user, name: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-envelope" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    required
                    onChange={e => setUser({ ...user, email: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-phone-alt" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone"
                    type="number"
                    autoComplete="new-phone"
                    required
                    onChange={e => setUser({ ...user, phone: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-fingerprint" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username"
                    required
                    onChange={e => setUser({ ...user, username: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={e => setUser({ ...user, password: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={registerButtonHandler}>
                  Sign up
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col lg="12" xs="12" className="text-center">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
            >
              <small>Already registered?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
