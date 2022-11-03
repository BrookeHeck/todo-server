'use strict';

const express = require('express');
const cors = require('cors');

const notFound404 = require('./error-handlers/404');
const serverError500 = require('./error-handlers/500');
const logger = require('./auth/middleware/logger');

const authRoutes = require('./../src/routes/authRouter');


// basic setup of express server
const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
require('dotenv').config();

// routes
app.use(authRoutes);

// error handlers
app.use('*', notFound404);
app.use(serverError500);

module.exports = {
  server: app,
  start: port => {
    if(!port) {throw new Error('Missing Port');}
    app.listen(port, () => console.log(`Listening on port ${port}`));
  },
};
