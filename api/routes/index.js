const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: res.title,
    impulses: [],
    sample: 'arnold_circus_demo.mp3',
  });
});

module.exports = router;
