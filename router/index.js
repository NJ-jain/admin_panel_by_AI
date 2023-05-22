const express = require('express');
const { insertSchema } = require('../controller');
const router = express.Router();


router.route('/').post(insertSchema);
module.exports = router; 