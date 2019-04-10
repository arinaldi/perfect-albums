import React from 'react';
import { render } from 'react-testing-library';
import Loader from '../components/Loader';

test('Loader renders', () => {
  const { getByText } = render(<Loader />);
  const span = getByText('Loading...');

  expect(span).toBeInTheDocument();
});
