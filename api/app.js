const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');
const helmet = require('helmet');
const OpenApiValidator = require('express-openapi-validator');

const globalErrorHandler = require('./controllers/errorController');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const impulseRouter = require('./routes/impulseRouter');
const uploadHelpers = require('./utils/uploadHelpers');
const oapi = require('./utils/openAPI');
const multerMemoryStorage = multer.memoryStorage();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Temporary fix until this PR which updates old packages causing this problem is merged https://github.com/wesleytodd/express-openapi/pull/21
const openApiCSP = {
  directives: {
    'default-src': [
      "'self'",
      'bootleg-spatial-recall.fra1.digitaloceanspaces.com',
    ],
    'script-src': [
      "'self'",
      'bootleg-spatial-recall.fra1.digitaloceanspaces.com',
      'https://stackpath.bootstrapcdn.com/',
      "'unsafe-inline'",
      'blob:',
      'data:',
    ],
    'style-src': [
      "'self'",
      'bootleg-spatial-recall.fra1.digitaloceanspaces.com',
      'https://stackpath.bootstrapcdn.com/',
      "'unsafe-inline'",
    ],
    'object-src': ["'none'"],
    'img-src': ['data:'],
    'upgrade-insecure-requests': [],
  },
};

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': [
        "'self'",
        'bootleg-spatial-recall.fra1.digitaloceanspaces.com',
      ],
    },
  }),
);

app.use(helmet.contentSecurityPolicy(openApiCSP), oapi);

app.use(
  OpenApiValidator.middleware({
    fileUploader: {
      storage: multerMemoryStorage,
      fileFilter: uploadHelpers.fileFilter,
    },
    apiSpec: path.join(__dirname, 'public/openapi.json'),
    validateResponses: true,
    validateRequests: true,
    ignorePaths: /.*\/openapi*\/$/,
  }),
);

app.use(function (req, res, next) {
  res.title = 'Bootleg Spatial Recall';
  next();
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/impulses', impulseRouter);

app.use(globalErrorHandler);

module.exports = app;
