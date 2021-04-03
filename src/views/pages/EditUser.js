import React, { useState, useEffect } from 'react';
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
import { addNewUser, updateExistingUser } from "../../services/UserService";
import { getSelectedUserState } from "../../store/Selectors";

const EditUser = () => {
  const selectedUser = useRecoilValue(getSelectedUserState);
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });
  const [form, setForm] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    userType: ""
  });

  useEffect(() => {
    setForm(selectedUser);
  }, [selectedUser]);

  const editButtonHandler = async (e) => {
    e.preventDefault();

    if (!form.name || form.name === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "name cannot be empty"
      });
      return;
    }

    if (!form.email || form.email === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "email cannot be empty"
      });
      return;
    }

    if (!form.phone || form.phone === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "phone cannot be empty"
      });
      return;
    }

    if (!form.username || form.username === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "username cannot be empty"
      });
      return;
    }

    if (!form.userType || form.userType === "") {
      setAlert({
        visible: true,
        color: "warning",
        message: "user type cannot be empty"
      });
      return;
    }

    let response = null;
    if (selectedUser._id !== "") {
      response = await updateExistingUser(form);
    } else {
      response = await addNewUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        username: form.username,
        password: "Oman@123",
        userType: form.userType
      });
    }
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
        updateButtonName={selectedUser._id !== "" ? "Edit User" : "Add User"}
        updateButtonHandler={editButtonHandler}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" lg="12" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">{selectedUser._id !== "" ? "Edit Existing User" : "Add New User"}</h3>
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={form.name}
                            id="input-name"
                            placeholder="Name"
                            type="text"
                            onChange={e => setForm({ ...form, name: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={form.email}
                            id="input-email"
                            placeholder="Email"
                            type="email"
                            onChange={e => setForm({ ...form, email: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={form.phone}
                            id="input-phone"
                            placeholder="Phone"
                            type="text"
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={form.username}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            onChange={e => setForm({ ...form, username: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label htmlFor="userType">User Role</label>
                          <Input type="select" id="input-userType" value={form.userType} onChange={e => setForm({ ...form, userType: e.target.value })}>
                            <option value="">- Select Role -</option>
                            <option value="ADMIN">Administrator</option>
                            <option value="USER">User</option>
                          </Input>
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
}

export default EditUser;
