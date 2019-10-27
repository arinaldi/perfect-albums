import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Context } from '../Provider';
import LinkWrapper from './LinkWrapper';
import SignOut from './SignOut';

const NavBar = () => {
  const { state: { isAuthenticated } } = useContext(Context);

  return (
    <Navbar
      collapseOnSelect
      bg='dark'
      variant='dark'
      expand='md'
      className='mb10'
      id='top'
    >
      <Navbar.Brand>Perfect Albums</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <LinkWrapper to='/albums' label='Top Albums' />
          <LinkWrapper to='/perfect-songs' label='Perfect Songs' />
          <LinkWrapper to='/featured-songs' label='Featured Songs' />
          <LinkWrapper to='/new-releases' label='New Releases' />
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
