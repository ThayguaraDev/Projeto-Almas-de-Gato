const express = require('express');
const donationController = require('../controllers/donationController');

const router = express.Router();

router.post('/', donationController.createDonation);

module.exports = router;
