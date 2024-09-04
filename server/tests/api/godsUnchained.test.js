const { fetchGodsUnchainedCards } = require('../../services/godsUnchainedService');

test('fetchGodsUnchainedCards fetches and processes card data correctly', async () => {
  const cards = await fetchGodsUnchainedCards();
  expect(cards).toBeInstanceOf(Array);
  expect(cards.length).toBeGreaterThan(0);
  const card = cards[0];
  expect(card).toHaveProperty('id');
  expect(card).toHaveProperty('name');
  expect(card).toHaveProperty('description');
  expect(card).toHaveProperty('image');
});
