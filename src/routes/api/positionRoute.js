const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const positionController = require('../../controllers/positionController');

router.route('/create').post(userController.loginAuth, positionController.create);
router.route('/update').put(userController.loginAuth, positionController.update);
router.route('/delete').put(userController.loginAuth, positionController.delete);
router.route('/list').get(userController.loginAuth, positionController.list);
router.route('/findById').get(userController.loginAuth, positionController.findById);

module.exports = router;