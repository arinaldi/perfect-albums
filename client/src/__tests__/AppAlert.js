import React from 'react';
import { render, cleanup, act } from 'react-testing-library';

import MyProvider, { MyContext } from '../containers/MyProvider';
import AppAlert from '../components/AppAlert';
import { ALERT_TYPES, MESSAGES } from '../constants';

afterEach(cleanup);

test('AppAlert renders as hidden', () => {
  const { container } = render(
    <MyProvider>
      <AppAlert />
    </MyProvider>
  );
  const div = container.querySelector('.alert-hide');

  expect(div).toBeInTheDocument();
});

test('AppAlert renders as visible', () => {
  let changeAlert;
  const message = `${MESSAGES.ALBUM_PREFIX} edited`;
  const { container, getByText } = render(
    <MyProvider>
      <MyContext.Consumer>
        {({ showAlert }) => {
          changeAlert = showAlert;
          return <AppAlert />;
        }}
      </MyContext.Consumer>
    </MyProvider>
  );

  act(() => {
    changeAlert(ALERT_TYPES.SUCCESS, message);
  });

  const div = container.querySelector('.alert-show');
  const text = getByText(message);

  expect(div).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
