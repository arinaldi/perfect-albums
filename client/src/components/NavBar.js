import React, { useContext, Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { MyContext } from '../containers/MyProvider';

const AuthLinks = () => {
  const { signOut } = useContext(MyContext);

  return (
    <Fragment>
      <Link className='nav-link' to='/admin'>Admin</Link>
      <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
    </Fragment>
  );
};

const SignInLink = () => (
  <Link className='nav-link' to='/signin'>Sign In</Link>
);

const NavBar = () => {
  const { state } = useContext(MyContext);

  return (
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
  );
};

export default NavBar;
