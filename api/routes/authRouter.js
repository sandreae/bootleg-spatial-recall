const express = require('express');
const authController = require('../controllers/authController');
const openApiController = require('./../controllers/openApiController');

const router = express.Router();

router
  .route('/signup')
  .post(openApiController.signup, authController.signup);

router
  .route('/login')
  .post(openApiController.login, authController.login);

module.exports = router;
