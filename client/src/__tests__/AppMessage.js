import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import AppMessage from '../components/AppMessage';

test('AppMessage renders', () => {
  render(<AppMessage />);
});
