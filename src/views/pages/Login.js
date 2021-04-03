import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";

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

import { login } from "../../services";
import { userState } from "../../store";

const Login = () => {

  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
    isRemembered: false
  });
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });
  const [, setUserState] = useRecoilState(userState);

  useEffect(() => {
    const rememberedUser = localStorage.getItem("USER");

    if (rememberedUser) {
      const parsedUser = JSON.parse(rememberedUser);
      setUser({ username: parsedUser.username, password: parsedUser.password, isRemembered: true });
    }
  }, []);

  const loginButtonHandler = async (e) => {
    e.preventDefault();

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

    const response = await login(user);
    console.log("response", response);

    if (response !== null) {

      if (response.status === "success") {
        setAlert({
          visible: true,
          color: "success",
          message: response.message
        });
        if (user.isRemembered) {
          localStorage.setItem("USER", JSON.stringify({
            username: response.data.username,
            password: response.data.password
          }));
        } else {
          localStorage.removeItem("USER");
        }

        setUserState({
          id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          username: response.data.username,
          userType: response.data.userType,
          isAuthenticated: true
        });

        setTimeout(() => {
          history.replace("/admin");
        }, 2000);
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
                      <i className="fas fa-fingerprint" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={user.username}
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
                    value={user.password}
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={e => setUser({ ...user, password: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  checked={user.isRemembered}
                  onChange={e => setUser({ ...user, isRemembered: e.target.checked })}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={loginButtonHandler}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-center" lg="12" xs="12">
            <a
              className="text-light"
              href="/auth/register"
              onClick={(e) => {
                e.preventDefault();
                history.push("/auth/register");
              }}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
