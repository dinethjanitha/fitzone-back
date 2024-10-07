// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const userController = require('../Controllers/userController');

const router = express.Router();

router.route('/signin').post(userController.signin);

router.route('/signup').post(userController.createNewUser);

router.route('/').get(userController.protected, userController.getAllUsers);
//   .patch(userController.updateUser);
router
  .route('/:id')
  .get(userController.userdetails)
  .patch(userController.updateUser);
//   .post(userController.createNewUser);

module.exports = router;
