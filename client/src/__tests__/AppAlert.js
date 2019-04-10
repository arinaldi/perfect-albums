import React from 'react';
import { render, cleanup, act } from 'react-testing-library';

import MyProvider, { MyContext } from '../containers/MyProvider';
import AppAlert from '../components/AppAlert';

afterEach(cleanup);

test('AppAlert renders as hidden', () => {
  const { container } = render(
    <MyProvider>
      <AppAlert />
    </MyProvider>
  );
  const div = container.querySelector('.alert-container');

  expect(div).toBeInTheDocument();
  expect(div).toHaveClass('alert-hide');
});

test('AppAlert renders as visible', () => {
  let changeAlert;
  const message = 'OK';
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
    changeAlert('success', message);
  });

  const containerDiv = container.querySelector('.alert-container');
  const messageDiv = getByText(message);

  expect(containerDiv).toBeInTheDocument();
  expect(containerDiv).toHaveClass('alert-show');
  expect(messageDiv).toBeInTheDocument();
});
