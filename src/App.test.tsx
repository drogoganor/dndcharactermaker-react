import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/D&D 5e Character Sheet Maker/i);
  expect(linkElement).toBeInTheDocument();
});
