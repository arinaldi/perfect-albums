import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Provider, { Context } from '../components/Provider';
import NavBar from '../components/NavBar/presenter';

afterEach(cleanup);

test('NavBar renders when not authenticated', () => {
  const { getByText } = render(
    <Provider>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
  const appHeader = getByText('Perfect Albums');
  const albumsLink = getByText('Top Albums');
  const songsLink = getByText('Perfect Songs');
  const signinLink = getByText('Sign In');

  expect(appHeader).toBeInTheDocument();
  expect(albumsLink).toBeInTheDocument();
  expect(songsLink).toBeInTheDocument();
  expect(signinLink).toBeInTheDocument();
});

test('NavBar renders when authenticated', () => {
  let handleSignIn;
  const { getByText } = render(
    <Provider>
      <Context.Consumer>
        {({ signIn }) => {
          handleSignIn = signIn;
          return (
            <MemoryRouter>
              <NavBar />
            </MemoryRouter>
          );
        }}
      </Context.Consumer>
    </Provider>
  );

  act(() => {
    handleSignIn('token');
  });

  const appHeader = getByText('Perfect Albums');
  const albumsLink = getByText('Top Albums');
  const songsLink = getByText('Perfect Songs');
  const adminLink = getByText('Perfect Songs');
  const signOutLink = getByText('Sign Out');

  expect(appHeader).toBeInTheDocument();
  expect(albumsLink).toBeInTheDocument();
  expect(songsLink).toBeInTheDocument();
  expect(adminLink).toBeInTheDocument();
  expect(signOutLink).toBeInTheDocument();
});
