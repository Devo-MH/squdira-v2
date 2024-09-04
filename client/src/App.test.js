import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Squdira title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Squdira/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Connect Wallet button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Connect Wallet/i);
  expect(buttonElement).toBeInTheDocument();
});
