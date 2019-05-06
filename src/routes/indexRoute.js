const express = require('express');
const router = express.Router();

router.use('/user', require('./api/userRoute'));
router.use('/position', require('./api/positionRoute'));
router.use('/role', require('./api/roleRoute'));
router.use('/permission', require('./api/permissionRoute'));

module.exports = router;