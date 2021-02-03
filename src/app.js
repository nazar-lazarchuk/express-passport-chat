const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//
const config = require('./env.json');
const port = config.APP_PORT;

index = require('./routes/index');
const user = require('./routes/user');
const auth = require('./routes/auth');

const passport = require('passport');

require('./passport');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/', index);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, () => {
  mongoose
    .connect('mongodb://localhost:27017/chat', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`App ready on http://localhost:${port}`);
    });
});

module.exports = app;
