import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import { getAllUsers, deleteExistingUser } from "../../services/UserService";
import { selectedUserState } from "../../store/Atoms";
import { getUserState } from "../../store/Selectors";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const user = useRecoilValue(getUserState);
  const [, setSelectedUser] = useRecoilState(selectedUserState);
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });

  const fetchUsers = async () => {
    const response = await getAllUsers();
    console.log("response", response);
    setUsers(response.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUserButtonHandler = (e) => {
    e.preventDefault();
    setSelectedUser({
      _id: "",
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      userType: ""
    });
    history.push("/admin/edit-user");
  }

  const editUserButtonHandler = (e, user) => {
    e.preventDefault();
    setSelectedUser(user);
    history.push("/admin/edit-user");
  }

  const deleteUserButtonHandler = async (e, user) => {
    e.preventDefault();

    const response = await deleteExistingUser(user);
    console.log("response", response);

    if (response) {
      if (response.status === "success") {
        setAlert({
          visible: true,
          color: "success",
          message: response.message
        });
        fetchUsers();
      } else {
        setAlert({
          visible: true,
          color: "danger",
          message: response.message
        });
      }
    } else {
      setAlert({
        visible: true,
        color: "danger",
        message: "Server Error"
      });
    }

    setTimeout(() => setAlert({
      visible: false,
      color: "",
      message: ""
    }), 3000);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">List of Registered Users</h3>
                <Button size="sm" color="primary" onClick={addUserButtonHandler}>
                  <i className="fas fa-user-plus"></i>{" "} Add New User
                </Button>
              </CardHeader>
              {alert.visible ?
                <Alert color={alert.color}>
                  {alert.message}
                </Alert> : null
              }
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Role</th>
                    <th scope="col">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) =>
                    <tr key={i}>
                      <th>{u.name}</th>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.userType === "ADMIN" ? "Administrator" : "User"}</td>
                      <td>
                        <Button color="success" size="sm" onClick={(e) => editUserButtonHandler(e, u)}>
                          <i className="fas fa-edit"></i>
                        </Button>
                        {user.id !== u._id ?
                          <Button color="danger" size="sm" onClick={(e) => deleteUserButtonHandler(e, u)}>
                            <i className="fas fa-trash"></i>
                          </Button> : null
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Users;
