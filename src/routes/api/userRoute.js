const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/create').post(userController.loginAuth, userController.create);
router.route('/update').put(userController.loginAuth, userController.update);
router.route('/delete').put(userController.loginAuth, userController.delete);
router.route('/list').get(userController.loginAuth, userController.list);

module.exports = router;