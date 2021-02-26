const express = require('express');
const impulseController = require('./../controllers/impulseController');
const authController = require('./../controllers/authController');
const openApiController = require('./../controllers/openApiController');

const router = express.Router();

router
  .route('')
  .get(
    openApiController.getAllImpulses,
    impulseController.getAllImpulses,
  )
  .post(
    openApiController.postImpulse,
    impulseController.processFiles,
    impulseController.createImpulse,
  );

router
  .route('/:id')
  .get(openApiController.getImpulse, impulseController.getImpulse)
  .patch(
    openApiController.patchImpulse,
    authController.protect,
    impulseController.updateImpulse,
  )
  .delete(authController.protect, impulseController.deleteImpulse);

module.exports = router;
