const express = require('express');
const router = express.Router();
const auth = require('../authRoute');
const userController = require('../../controllers/userController');

router.route('/register').post(auth.optional, userController.register);
router.route('/login').post(auth.optional, userController.login);
router.route('/create').post(auth.required, userController.create);
router.route('/update').put(auth.required, userController.update);
router.route('/delete').put(auth.required, userController.delete);
router.route('/list').get(auth.required, userController.list);

module.exports = router;