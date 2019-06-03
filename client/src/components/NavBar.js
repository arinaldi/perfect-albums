import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MyContext } from '../containers/MyProvider';

const activeStyle = {
  color: 'rgba(255,255,255,.75)',
};

const LinkWrapper = ({ to, label }) => (
  <Nav.Link eventKey={to} active={false} as='span'>
    <NavLink
      className='link'
      activeStyle={activeStyle}
      to={to}
    >
      {label}
    </NavLink>
  </Nav.Link>
);

LinkWrapper.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const SignOut = () => {
  const { signOut } = useContext(MyContext);

  return (
    <Nav.Link
      className='sign-out'
      eventKey='signout'
      active={false}
      as='div'
    >
      <span onClick={signOut}>Sign Out</span>
    </Nav.Link>
  );
};

const NavBar = () => {
  const { state: { isAuthenticated } } = useContext(MyContext);

  return (
    <Navbar collapseOnSelect bg='dark' variant='dark' expand='md'>
      <Navbar.Brand>Perfect Albums</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <LinkWrapper to='/albums' label='Top Albums' />
          <LinkWrapper to='/perfect-songs' label='Perfect Songs' />
          <LinkWrapper to='/featured-songs' label='Featured Songs' />
          {isAuthenticated && <LinkWrapper to='/admin' label='Admin' />}
        </Nav>
        <Nav>
          {isAuthenticated
            ? <SignOut />
            : <LinkWrapper to='/signin' label='Sign In' />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
