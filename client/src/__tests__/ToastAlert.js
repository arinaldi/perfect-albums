import React from 'react';
import { cleanup, act } from '@testing-library/react';

import { Context } from '../components/Provider';
import ToastAlert from '../components/ToastAlert/presenter';

import render from '../__test-utils__';
import { TOAST_TYPES, MESSAGES } from '../constants';

afterEach(cleanup);

test('ToastAlert renders as hidden', () => {
  const { container } = render(<ToastAlert />);
  const div = container.querySelector('.toast-body');

  expect(div.textContent).toBe('');
});

test('ToastAlert renders as visible', () => {
  let changeToast;
  const message = `${MESSAGES.ALBUM_PREFIX} edited`;
  const { container, getByText } = render(
    <Context.Consumer>
      {({ showToast }) => {
        changeToast = showToast;
        return <ToastAlert />;
      }}
    </Context.Consumer>,
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
