'use strict';

const express = require('express');
const cors = require('cors');

const notFound404 = require('./error-handlers/404');
const serverError500 = require('./error-handlers/500');


// basic setup of express server
const app = express();
app.use(express.json());
app.use(cors());

// routes

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
