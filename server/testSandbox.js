// server/testSandbox.js
const fetchSandboxLand = require('./games/sandbox');

const testLandId = 'some-land-id'; // Replace with an actual LAND ID for testing

fetchSandboxLand(testLandId).then(land => {
  console.log('Sandbox LAND:', land);
});
