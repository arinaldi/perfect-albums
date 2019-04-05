import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import Loader from '../components/Loader';

test('Loader renders', () => {
  render(<Loader />);
});
