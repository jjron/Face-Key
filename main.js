'use strict';

require('dotenv').config();
const server = require('./server');
const debug = require('debug')('facekey:server');

server.listen(process.env.PORT, () => {
  debug('start server');
  console.log('server up on PORT', process.env.PORT);
});
