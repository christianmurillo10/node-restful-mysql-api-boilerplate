const express = require('express');
const router = express.Router();
const auth = require('../authRoute');
const userController = require('../../controllers/userController');

router.route('/register').post(auth.optional, userController.register);
router.route('/login').post(auth.optional, userController.login);
router.route('/create').post(userController.create);
router.route('/update').put(userController.update);
router.route('/delete').put(userController.delete);
router.route('/list').get(userController.list);

module.exports = router;