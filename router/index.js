const express = require('express');
const { insertSchema, getQueryResult } = require('../controller');
const router = express.Router();


router.route('/').post(insertSchema);
router.route('/get').get(getQueryResult);
module.exports = router; 