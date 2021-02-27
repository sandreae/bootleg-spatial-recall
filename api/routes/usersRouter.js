const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const openApiController = require('./../controllers/openApiController');

const router = express.Router();

router
  .route('/signup')
  .post(openApiController.signup, authController.signup);

router
  .route('/login')
  .post(openApiController.login, authController.login);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// router.patch(
//   '/updateMyPassword',
//   authController.protect,
//   authController.updatePassword
// );

// router.patch('/updateMe', authController.protect, userController.updateMe);
// router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('')
  .get(
    openApiController.getAllUsers,
    authController.protect,
    userController.getAllUsers,
  );

router
  .route('/:id')
  .get(
    openApiController.getUser,
    authController.protect,
    userController.getUser,
  )
  .patch(
    openApiController.patchUser,
    authController.protect,
    userController.updateUser,
  )
  .delete(
    openApiController.deleteUser,
    authController.protect,
    userController.deleteUser,
  );

module.exports = router;
