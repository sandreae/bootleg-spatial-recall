const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const impulsesRouter = require('./routes/impulseRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        'bootleg-spatial-recall.fra1.digitaloceanspaces.com',
      ],
      scriptSrc: ["'self'"],
    },
  }),
);

app.use(function (req, res, next) {
  res.title = 'Bootleg Spatial Recall';
  next();
});

app.use('/impulses', impulsesRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

module.exports = app;
