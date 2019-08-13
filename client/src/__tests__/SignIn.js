import React from 'react';
import { render } from '@testing-library/react';

import SignIn from '../components/SignIn';

test('SignIn renders with username and password inputs', () => {
  const { getByLabelText } = render(
    <SignIn
      username=''
      password=''
      handleChange={() => {}}
      handleSubmit={() => {}}
    />
  );
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);

  expect(usernameInput).toHaveAttribute('type', 'text');
  expect(usernameInput).toHaveAttribute('name', 'username');
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(passwordInput).toHaveAttribute('name', 'password');
});
