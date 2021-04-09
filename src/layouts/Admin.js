import React, { useEffect } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";

// reactstrap components
import { Container } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import Profile from "../views/pages/Profile";
import ChangePassword from "../views/pages/ChangePassword";
import EditUser from "../views/pages/EditUser";

import { adminRoutes, userRoutes } from "../routes";

import { getUserState, dataState } from "../store";

import { loadData } from "../services";

const Admin = (props) => {
  const location = useLocation();
  const user = useRecoilValue(getUserState);
  const [, setDataState] = useRecoilState(dataState);

  useEffect(() => {
    const loadPropertyData = async () => {
      const response = await loadData({ page: 1, limit: 30 });
      console.log("response", response);

      if (response != null) {
        if (response.status === "success") {
          setDataState(response.data);
        } else {
          setDataState({});
        }
      } else {
        setDataState({});
      }
    }

    loadPropertyData();
  }, [setDataState]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);



  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getUserRoutes = () => {
    if (user.userType === "ADMIN")
      return adminRoutes;
    else
      return userRoutes
  }

  const getBrandText = (path, routes) => {
    return path.split('/')[2] !== undefined ? path.split('/')[2].replace("-", " ") : "Dashboard";
  };

  return (
    user.isAuthenticated ?
      <>
        <Sidebar
          {...props}
          routes={getUserRoutes()}
          logo={{
            innerLink: "/admin/dashboard",
            imgSrc: require("../assets/img/brand.png").default,
            imgAlt: "Brand",
          }}
        />
        <div className="main-content">
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname, getUserRoutes())}
          />
          <Switch>
            {getRoutes(getUserRoutes())}
            <Route path="/admin/profile" component={Profile} />
            <Route path="/admin/change-password" component={ChangePassword} />
            <Route path="/admin/edit-user" component={EditUser} />
            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </> : <Redirect to="/auth" />
  );
};

export default Admin;
