import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import { userState, getUserState } from "../../store";

const AdminNavbar = (props) => {

  const history = useHistory();
  const [, setUserState] = useRecoilState(userState);
  const user = useRecoilValue(getUserState);

  const logoutButtonHandler = (e) => {
    e.preventDefault();

    setUserState({
      id: "",
      name: "",
      email: "",
      phone: "",
      username: "",
      userType: "",
      isAuthenticated: false
    });

    history.replace("/auth");
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="Avatar"
                      src={require("../../assets/img/avatar.jpg").default}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/profile" tag={Link}>
                  <i className="ni ni-circle-08" />
                  <span>My Profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/change-password" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span>Change Password</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={logoutButtonHandler}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
