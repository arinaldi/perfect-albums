import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthLinks = ({ signOut }) => (
  <Fragment>
    <Link className='nav-link' to='/admin'>Admin</Link>
    <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
  </Fragment>
);

AuthLinks.propTypes = {
  signOut: PropTypes.func.isRequired,
};

const SignInLink = () => (
  <Link className='nav-link' to='/signin'>Sign In</Link>
);

const NavBar = ({ signOut, isAuthenticated }) => (
  <Navbar bg='dark'  variant='dark' expand='md'>
    <Navbar.Brand>Perfect Albums</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Link className='nav-link' to='/albums'>Top Albums</Link>
        <Link className='nav-link' to='/songs'>Perfect Songs</Link>
        {isAuthenticated
          ? <AuthLinks signOut={signOut} />
          : <SignInLink />}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavBar.propTypes = {
  signOut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavBar;
