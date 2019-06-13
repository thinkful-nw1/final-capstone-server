require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const userRouter = require('./users/users-router');
const flightsRouter = require('./flights/flights-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use('/api/users', userRouter);
app.use('/api/flights', flightsRouter);

app.get('/', (req, res) => {
  res.send('Travel App API');
});

app.use(function errorHandler(error, req, res, next) {
  let response =
    NODE_ENV === 'production'
      ? { error: { message: 'server error' } }
      : { message: error.message, error };
  res.status(500).json(response);
});

module.exports = app;
