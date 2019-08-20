import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import Provider, { Context } from '../components/Provider';
import ToastAlert from '../components/ToastAlert/presenter';
import { TOAST_TYPES, MESSAGES } from '../constants';

afterEach(cleanup);

test('ToastAlert renders as hidden', () => {
  const { container } = render(
    <Provider>
      <ToastAlert />
    </Provider>
  );
  const div = container.querySelector('.toast-body');

  expect(div.textContent).toBe('');
});

test('ToastAlert renders as visible', () => {
  let changeToast;
  const message = `${MESSAGES.ALBUM_PREFIX} edited`;
  const { container, getByText } = render(
    <Provider>
      <Context.Consumer>
        {({ showToast }) => {
          changeToast = showToast;
          return <ToastAlert />;
        }}
      </Context.Consumer>
    </Provider>
  );

  act(() => {
    changeToast({
      type: TOAST_TYPES.SUCCESS,
      message,
    });
  });

  const div = container.querySelector('.toast');
  const text = getByText(message);

  expect(div).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
