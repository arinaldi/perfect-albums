import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthLinks = (props) => (
  <Fragment>
    <Link className="nav-link" to="/admin">Admin</Link>
    <Nav.Link onClick={props.onSignOut}>Sign Out</Nav.Link>
  </Fragment>
);

const SignInLink = () => (
  <Link className="nav-link" to="/signin">Sign In</Link>
);

const TopNavbar = (props) => (
  <Navbar bg="dark"  variant="dark" expand="md">
    <Navbar.Brand>Perfect Albums</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className="nav-link" to="/albums">Top Albums</Link>
        <Link className="nav-link" to="/songs">Perfect Songs</Link>
        { props.showAuthItems ? <AuthLinks {...props} /> : <SignInLink /> }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default TopNavbar;
