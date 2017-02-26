'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('facekey:index');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.log(err.message);
  if(err.status)
    return res.status(err.status).send();
  if(err.name === 'ValidationError')
    return res.status(400).send();
  if(err.name === 'MongoError' && err.code == '11000')
    return res.status(409).send();
  res.status(500).send();
  next();
});
