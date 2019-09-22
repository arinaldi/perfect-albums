import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';

import { Context } from '../Provider';

const SignOut = () => {
  const { signOut } = useContext(Context);

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

export default SignOut;
