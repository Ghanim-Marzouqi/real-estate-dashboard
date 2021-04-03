import React from "react";
import { useRecoilValue } from "recoil";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

import { getUserState } from "../../store";

const UserHeader = ({ updateButtonName, updateButtonHandler }) => {
  const user = useRecoilValue(getUserState);

  return (
    <>
      <div
        className="header pb-8 mb-2 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "400px",
          backgroundImage: `url(${require("../../assets/img/theme/profile-cover.jpeg").default})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" xl="12">
              <h1 className="display-2 text-white">Hello {user.name}</h1>
              <h3 className="display-4 text-white">Your Role: {user.userType === "ADMIN" ? "Administrator" : "User"}</h3>
              <Button
                className="mt-2"
                color="info"
                href="#pablo"
                onClick={updateButtonHandler}
              >
                {updateButtonName}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
