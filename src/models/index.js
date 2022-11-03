'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const taskModel = require('./tasks/tasks');
const userModel = require('./users/users');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';

const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  tasks: taskModel(sequelize, DataTypes),
};

