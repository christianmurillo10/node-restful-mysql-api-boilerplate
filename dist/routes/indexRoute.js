const express = require('express');
const router = express.Router();

router.use('/user', require('./api/userRoute'));

module.exports = router;