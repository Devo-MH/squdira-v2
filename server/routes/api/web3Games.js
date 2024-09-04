const express = require('express');
const { getGodsUnchainedCards } = require('../../controllers/godsUnchainedController');

const router = express.Router();

router.get('/gods-unchained/cards', getGodsUnchainedCards);

module.exports = router;
