const express = require('express');
const router = express.Router();

router.use('/user', require('./api/userRoute'));
router.use('/position', require('./api/positionRoute'));

module.exports = router;