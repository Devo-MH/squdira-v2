// server/testGodsUnchained.js
const fetchGodsUnchainedGames = require('./games/godsUnchained');

fetchGodsUnchainedGames().then(games => {
  console.log('Gods Unchained Games:', games);
});
