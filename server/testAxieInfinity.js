// server/testAxieInfinity.js
const fetchAxieInfinityGames = require('./games/axieInfinity');

fetchAxieInfinityGames().then(games => {
  console.log('Axie Infinity Games:', games);
});
