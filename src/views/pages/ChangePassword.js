import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

// reactstrap components
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { changePassword } from "../../services/AuthService";
import { getUserState } from "../../store";

const ChangePassword = () => {

  const user = useRecoilValue(getUserState);
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });
  const [form, setForm] = useState({
    _id: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        _id: user.id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  }, [user]);

  const chnagePasswordButtonHandler = async (e) => {
    if (!form.oldPassword || form.oldPassword === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "old password cannot be empty"
      });
      return;
    }

    if (!form.newPassword || form.newPassword === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "new password cannot be empty"
      });
      return;
    }

    if (!form.confirmPassword || form.confirmPassword === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "confirm password cannot be empty"
      });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setAlert({
        visible: true,
        color: "warning",
        message: "new password and confirm password must match"
      });
      return;
    }

    const response = await changePassword(form);
    console.log("response", response);

    if (response.status === "success") {
      setAlert({
        visible: true,
        color: "success",
        message: response.message
      });
    } else if (response.status === "fail" || response.status === "error") {
      setAlert({
        visible: true,
        color: "danger",
        message: response.message
      });
    }

    setTimeout(() => {
      setAlert({
        visible: false,
        color: "",
        message: ""
      });
    }, 3000);
  }

  return (
    <>
      <UserHeader
        updateButtonName="Change Password"
        updateButtonHandler={chnagePasswordButtonHandler}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" lg="12" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Change Password</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  {alert.visible ?
                    <Alert color={alert.color}>
                      {alert.message}
                    </Alert> : null
                  }
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12" xl="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-old-password"
                          >
                            Old Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={form.oldPassword}
                            id="input-old-password"
                            placeholder="Enter old password"
                            type="password"
                            onChange={e => setForm({ ...form, oldPassword: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" xl="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-new-password"
                          >
                            New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={form.newPassword}
                            id="input-new-password"
                            placeholder="Enter new password"
                            type="password"
                            onChange={e => setForm({ ...form, newPassword: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" xl="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-confirm-password"
                          >
                            Confirm Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={form.confirmPassword}
                            id="input-confirm-password"
                            placeholder="Confirm password"
                            type="password"
                            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChangePassword;
