const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const permissionController = require('../../controllers/permissionController');

router.route('/create').post(userController.loginAuth, permissionController.create);
router.route('/update').put(userController.loginAuth, permissionController.update);
router.route('/delete').put(userController.loginAuth, permissionController.delete);
router.route('/list').get(userController.loginAuth, permissionController.list);
router.route('/findById').get(userController.loginAuth, permissionController.findById);

module.exports = router;