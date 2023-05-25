const express = require('express');
const { getQueryResult } = require('../controller');
const router = express.Router();



router.route('/:id/get').get(getQueryResult);


module.exports = router; 