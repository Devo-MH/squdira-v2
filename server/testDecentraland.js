// server/testDecentraland.js
const fetchDecentralandParcels = require('./games/decentraland');

fetchDecentralandParcels().then(parcels => {
  console.log('Decentraland Parcels:', parcels);
});
