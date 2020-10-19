const express = require('express');
const router = express.Router();

const { transferMoney, addAccount } = require('./services');

router.post('/transfer', transferMoney);
router.post('/add', addAccount);

module.exports = router;