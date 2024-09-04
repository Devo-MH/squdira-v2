const fetchSandboxLand = require('../games/sandbox');
const fetchOpenSeaData = require('../games/openSea');

const fetchAllGames = async () => {
  const games = [];

  // Fetch games from The Sandbox
  const sandboxGame = await fetchSandboxLand('some-valid-land-id'); // Replace with actual ID
  if (sandboxGame) games.push(sandboxGame);

  // Fetch data from OpenSea
  const openSeaGames = await fetchOpenSeaData();
  if (openSeaGames.length > 0) games.push(...openSeaGames);

  return games;
};

module.exports = fetchAllGames;
