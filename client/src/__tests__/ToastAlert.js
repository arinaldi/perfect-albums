import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import MyProvider, { MyContext } from '../containers/MyProvider';
import ToastAlert from '../components/ToastAlert';
import { TOAST_TYPES, MESSAGES } from '../constants';

afterEach(cleanup);

test('ToastAlert renders as hidden', () => {
  const { container } = render(
    <MyProvider>
      <ToastAlert />
    </MyProvider>
  );
  const div = container.querySelector('.toast-body');

  expect(div.textContent).toBe('');
});

test('ToastAlert renders as visible', () => {
  let changeToast;
  const message = `${MESSAGES.ALBUM_PREFIX} edited`;
  const { container, getByText } = render(
    <MyProvider>
      <MyContext.Consumer>
        {({ showToast }) => {
          changeToast = showToast;
          return <ToastAlert />;
        }}
      </MyContext.Consumer>
    </MyProvider>
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
