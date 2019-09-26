import React from 'react';
import { cleanup, act } from '@testing-library/react';

import { Context } from '../components/Provider';
import NavBar from '../components/NavBar/presenter';

import render from '../__test-utils__';

afterEach(cleanup);

test('NavBar renders when not authenticated', () => {
  const { getByText } = render(<NavBar />);
  const appHeader = getByText('Perfect Albums');
  const albumsLink = getByText('Top Albums');
  const songsLink = getByText('Perfect Songs');
  const featuredLink = getByText('Featured Songs');
  const releasesLink = getByText('New Releases');
  const signinLink = getByText('Sign In');

  expect(appHeader).toBeInTheDocument();
  expect(albumsLink).toBeInTheDocument();
  expect(songsLink).toBeInTheDocument();
  expect(featuredLink).toBeInTheDocument();
  expect(releasesLink).toBeInTheDocument();
  expect(signinLink).toBeInTheDocument();
});

test('NavBar renders when authenticated', () => {
  let handleSignIn;
  const { getByText } = render(
    <Context.Consumer>
      {({ signIn }) => {
        handleSignIn = signIn;
        return <NavBar />;
      }}
    </Context.Consumer>
  );

  act(() => {
    handleSignIn('token');
  });

  const adminLink = getByText('Admin');
  const signOutLink = getByText('Sign Out');

  expect(adminLink).toBeInTheDocument();
  expect(signOutLink).toBeInTheDocument();
});
