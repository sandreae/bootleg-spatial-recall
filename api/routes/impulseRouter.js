const express = require('express');
const impulseController = require('./../controllers/impulseController');
const authController = require('./../controllers/authController');
const openApiController = require('./../controllers/openApiController');

const router = express.Router();

// router.param('id', impulseController.checkID);

router
  .route('/')
  .get(
    openApiController.getAllImpulses,
    impulseController.getAllImpulses,
  )
  .post(
    openApiController.postImpulse,
    impulseController.preUpload,
    impulseController.resizeImage,
    impulseController.uploadFiles,
    impulseController.createImpulse,
  );

router
  .route('/:id')
  .get(openApiController.getImpulseById, impulseController.getImpulse)
  .patch(authController.protect, impulseController.updateImpulse)
  .delete(authController.protect, impulseController.deleteImpulse);

module.exports = router;
