const express = require('express');
const { getQueryResult } = require('../controller');
const router = express.Router();



router.route('/:id').post(getQueryResult);


module.exports = router; 