'use strict';

const { db } = require('./src/models/index');
const server = require('./src/server');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

db.sync().then(() => {
  try {
    server.start(PORT);
  } catch(e) {
    console.log(e);
  }
});

