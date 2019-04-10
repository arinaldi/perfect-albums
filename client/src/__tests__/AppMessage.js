import React from 'react';
import { render } from 'react-testing-library';
import AppMessage from '../components/AppMessage';

test('AppMessage renders error message', () => {
  const message = 'Something went wrong';
  const { getByText } = render(<AppMessage type='danger' message={message} />);
  const div = getByText(message);

  expect(div).toBeInTheDocument();
  expect(div).toHaveClass('alert-danger');
  expect(div).toHaveAttribute('role', 'alert');
});

test('AppMessage renders success message', () => {
  const message = 'OK';
  const { getByText } = render(<AppMessage type='success' message={message} />);
  const div = getByText(message);

  expect(div).toBeInTheDocument();
  expect(div).toHaveClass('alert-success');
  expect(div).toHaveAttribute('role', 'alert');
});
