'use strict';

const express = require('express');
const { tasks } = require('./../models');
const bearerAuth = require('./../auth/middleware/bearer-auth');
const permissions = require('./../auth/middleware/acl');

const router = express.Router();

router.get('/tasks', bearerAuth, permissions('delete'), handleGetAll);
router.get('/tasks/:user_id', bearerAuth, permissions('read'), handleGetOne);
router.post('/tasks', bearerAuth, permissions('read'), handleCreate);
router.put('/tasks/:task_id', bearerAuth, permissions('read'), handleUpdate);
router.delete('/tasks/:task_id', bearerAuth, permissions('read'), handleDelete);

async function handleGetAll(req, res, next) {
  try {
    const allTasks = await tasks.findAll();
    res.status(200).send(allTasks);
  } catch (e) {
    next('Invalid Request');
  }
}

async function handleGetOne(req, res, next) {
  try {
    const user_id = req.params.user_id;
    const userTasks = await tasks.findAll({ where: { user_id: user_id } });
    res.status(200).send(userTasks);
  } catch (e) {
    next('Invalid Request');
  }
}

async function handleCreate(req, res, next) {
  try {
    const taskObj = req.body;
    const taskRecord = await tasks.create(taskObj);
    res.status(200).send(taskRecord);
  } catch (e) {
    next('Invalid Request');
  }
}

async function handleUpdate(req, res, next) {
  try {
    const task_id = req.params.task_id;
    const updatedObj = req.body;
    const updatedRecord = await tasks.update(task_id, updatedObj);
    res.status(200).send(updatedRecord);
  } catch (e) {
    next('Invalid Request');
  }
}

async function handleDelete(req, res, next) {
  try {
    const task_id = req.params.task_id;
    console.log(task_id);
    const deleteRecord = await tasks.delete(task_id);
    res.status(200).send(deleteRecord);
  } catch(e) {
    next(e);
  }
}

module.exports = router;