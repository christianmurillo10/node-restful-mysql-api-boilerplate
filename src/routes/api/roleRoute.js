const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const roleController = require('../../controllers/roleController');

router.route('/create').post(userController.loginAuth, roleController.create);
router.route('/update').put(userController.loginAuth, roleController.update);
router.route('/delete').put(userController.loginAuth, roleController.delete);
router.route('/list').get(userController.loginAuth, roleController.list);
router.route('/findById').get(userController.loginAuth, roleController.findById);

module.exports = router;