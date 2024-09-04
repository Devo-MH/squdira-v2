import React from 'react';
import { render, screen } from '@testing-library/react';
import CardDisplay from '../../components/CardDisplay';

test('CardDisplay renders card details correctly', () => {
  const card = {
    id: 'test-id',
    proto: 123,
    name: 'Test Card',
    description: 'This is a test card.',
    purity: 100,
    user: '0xTestUser',
    image: 'https://placeholder.com/placeholder.png',
  };

  render(<CardDisplay card={card} />);

  expect(screen.getByText('Test Card')).toBeInTheDocument();
  expect(screen.getByText('This is a test card.')).toBeInTheDocument();
  expect(screen.getByAltText('Test Card')).toBeInTheDocument();
});
