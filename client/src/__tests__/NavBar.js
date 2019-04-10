import React from 'react';
import { render, cleanup, act } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import MyProvider, { MyContext } from '../containers/MyProvider';
import NavBar from '../components/NavBar';

afterEach(cleanup);

test('NavBar renders when not authenticated', () => {
  const { getByText } = render(
    <MyProvider>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </MyProvider>
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

// test when authenticated
test('NavBar renders when authenticated', () => {
  let handleSignIn;
  const { getByText } = render(
    <MyProvider>
      <MyContext.Consumer>
        {({ signIn }) => {
          handleSignIn = signIn;
          return (
            <MemoryRouter>
              <NavBar />
            </MemoryRouter>
          );
        }}
      </MyContext.Consumer>
    </MyProvider>
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
