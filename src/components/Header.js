import React from "react";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { withFirebase } from "../api/Firebase";

const Navbar = styled(BootstrapNavbar)`
  background: #333333;
  border-top: 3px solid ${(props) => props.theme.palette.mainBrand};
  color: white;
  padding: 1rem 1rem;
`;

const Link = styled(GatsbyLink)`
  color: white;
  margin: 0 10px;
  width: fit-content;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const Header = ({ firebase }) => {
  return (
    <Navbar expand="lg">
      <Link to="/" className="hvr-underline-from-center">
        <Navbar.Brand style={{ padding: 0, marginRight: 0, color: "white" }}>
          Inquisitor
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ height: "100%" }}>
            <>
              <Link to="/interest-form" className="hvr-underline-from-center">
                Interest Form
              </Link>
              <Link to="/apply" className="hvr-underline-from-center">
                Apply
              </Link>
            </>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withFirebase(Header);