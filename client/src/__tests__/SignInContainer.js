import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import SignInContainer from '../components/SignIn';
import Provider from '../components/Provider';
import mockApi from '../utils/api';

jest.mock('../utils/api', () => {
  return {
    post: jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ token: 'token' }),
    })),
  };
});

afterAll(() => {
  mockApi.post.mockClear();
});

test('SignInContainer submits credentials', async () => {
  const history = createMemoryHistory({});
  const username = 'user';
  const password = '1234';
  const { getByLabelText, getByText } = render(
    <Provider>
      <Router history={history}>
        <SignInContainer />
      </Router>
    </Provider>
  );
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);
  const submitButton = getByText('Submit');

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(submitButton);

  expect(mockApi.post).toHaveBeenCalledTimes(1);
  expect(mockApi.post).toHaveBeenCalledWith(
    '/api/signin',
    { username, password },
  );
});
