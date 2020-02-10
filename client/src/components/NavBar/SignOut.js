import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { removeToken } from '../../utils/storage';
import { DISPATCH_TYPES } from '../../constants';
import { useAppDispatch } from '../Provider';

const SignOut = () => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    removeToken();
    dispatch({
      type: DISPATCH_TYPES.SET_USER,
      payload: false,
    });
  };

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
