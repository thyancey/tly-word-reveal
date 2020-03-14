import React from 'react';
import { render } from '@testing-library/react';
import Example from './Example';

test('renders learn react link', () => {
  const { getByText } = render(<Example />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
