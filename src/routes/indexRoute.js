const express = require('express');
const router = express.Router();

router.use('/user', require('./api/userRoute'));
router.use('/position', require('./api/positionRoute'));
router.use('/role', require('./api/roleRoute'));

module.exports = router;