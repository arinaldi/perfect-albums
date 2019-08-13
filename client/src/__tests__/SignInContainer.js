import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SignInContainer from '../containers/SignIn';
import MyProvider from '../containers/MyProvider';
import mockApi from '../utils/api';

jest.mock('../utils/api', () => {
  return {
    post: jest.fn(() => Promise.resolve({ token: 'token' })),
  };
});

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  mockApi.post.mockClear();
});

test('SignInContainer submits credentials', async () => {
  const username = 'user';
  const password = '1234';
  const { getByLabelText, getByText } = render(
    <MyProvider>
      <SignInContainer />
    </MyProvider>
  );
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);
  const submitButton = getByText(/submit/i);

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(submitButton);

  expect(submitButton).toBeDisabled();
  expect(mockApi.post).toHaveBeenCalledTimes(1);
  expect(mockApi.post).toHaveBeenCalledWith(
    '/api/signin',
    { username, password },
  );
});
