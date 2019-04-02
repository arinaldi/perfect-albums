import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { MyConsumer } from '../containers/MyProvider';

const AuthLinks = () => (
  <MyConsumer>
    {({ signOut }) => (
      <Fragment>
        <Link className='nav-link' to='/admin'>Admin</Link>
        <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
      </Fragment>
    )}
  </MyConsumer>
);

const SignInLink = () => (
  <Link className='nav-link' to='/signin'>Sign In</Link>
);

const NavBar = () => (
  <MyConsumer>
    {({ state }) => (
      <Navbar bg='dark' variant='dark' expand='md'>
        <Navbar.Brand>Perfect Albums</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Link className='nav-link' to='/albums'>Top Albums</Link>
            <Link className='nav-link' to='/songs'>Perfect Songs</Link>
            {state.isAuthenticated
              ? <AuthLinks />
              : <SignInLink />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )}
  </MyConsumer>
);

export default NavBar;
