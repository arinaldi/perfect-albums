import React, { useContext, Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { MyContext } from '../containers/MyProvider';

const activeStyle = {
  color: 'rgba(255,255,255,.75)',
};

const AuthLinks = () => {
  const { signOut } = useContext(MyContext);

  return (
    <Fragment>
      <NavLink
        className='nav-link'
        activeStyle={activeStyle}
        to='/admin'
      >
        Admin
      </NavLink>
      <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
    </Fragment>
  );
};

const SignInLink = () => (
  <NavLink
    className='nav-link'
    activeStyle={activeStyle}
    to='/signin'
  >
    Sign In
  </NavLink>
);

const NavBar = () => {
  const { state } = useContext(MyContext);

  return (
    <Navbar bg='dark' variant='dark' expand='md'>
      <Navbar.Brand>Perfect Albums</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <NavLink
            className='nav-link'
            activeStyle={activeStyle}
            to='/albums'
          >
            Top Albums
          </NavLink>
          <NavLink
            className='nav-link'
            activeStyle={activeStyle}
            to='/songs'
          >
            Perfect Songs
          </NavLink>
          {state.isAuthenticated
            ? <AuthLinks />
            : <SignInLink />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
