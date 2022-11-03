'use strict';

const taskModel = (sequelize, DataTypes) => sequelize.define('Tasks', {
  user_id: {type: DataTypes.STRING, required: true},
  text: { type: DataTypes.STRING, required: true },
  assignee: {type: DataTypes.STRING, require: true },
  difficulty: {type: DataTypes.NUMBER, required: true },
  complete: {type: DataTypes.BOOLEAN, required: true},
});

module.exports = taskModel;