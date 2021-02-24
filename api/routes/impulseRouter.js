const express = require('express');
const impulseController = require('./../controllers/impulseController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', impulseController.checkID);

router
  .route('/')
  .get(impulseController.getAllImpulses)
  .post(
    impulseController.preUpload,
    impulseController.resizeImage,
    impulseController.uploadFiles,
    impulseController.createImpulse,
  );

router
  .route('/:id')
  .get(impulseController.getImpulse)
  .patch(authController.protect, impulseController.updateImpulse)
  .delete(authController.protect, impulseController.deleteImpulse);

module.exports = router;
