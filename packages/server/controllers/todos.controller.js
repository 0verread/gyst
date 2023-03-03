const todos = require("express").Router();
const cors = require("cors");
const jwt  = require("jsonwebtoken");

const Todo = require("../models/Todos.js");
const {db_password, secret_key} = require("../config/envvars");

todos.use(cors());
var secret = secret_key;

// Create TODO task
exports.create = (req, result) => {
  if (req.headers['authorization']) {
    var bareerToken = req.headers['authorization'].split(' ')[1];
    if (!req.body.title && !req.body.isDone) {
      result.status(400);
      result.json({
        error: 'Bad data'
      })
    } else {
      var decoded = jwt.decode(bareerToken, secret);
      var user_id = decoded.id;
      req.body.user_id = user_id;
      Todo.create(req.body).then(data => {
        result.send(data)
      })
      .catch(err => {
        result.json("error:" + err)
      })
    }
  } else {
    result.json({status: "failed", message: "Token not passed !"})
  }
}

// Get all TODO tasks
exports.findAll = (req, res) => {
  if (req.headers['authorization']) {
    var bareerToken = req.headers['authorization'].split(' ')[1];
    console.log(bareerToken);
    var decoded = jwt.decode(bareerToken, secret);
    var user_id = decoded.id;
    Todo.findAll({
      where: {
        user_id: user_id
      }
    })
    .then(tasks => {
      res.json(tasks)
    })
    .catch(err => {
      res.json("error: " + err);
    })
  } else {
    res.json({status: "failed", message: "Token not passed !"});
  }
}

// Get a single TODO task by Id
exports.findById = (req, res) => {
  if(req.headers['authorization']) {
    var bareerToken = req.headers['authorization'].split(' ')[1];
    Todo.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(task => {
      if(task) {
        res.json(task)
      } else {
        res.send('Task does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
  } else {
    res.json({status: "failed", message: "Token is not passed !"})
  }
}

// Update a TODO task by Id
exports.updateById = (req, res) => {
  if(req.headers['authorization']) {
    if(!req.body.title && !req.body.isDone) {
      res.status(400)
      res.json({
        error: "Bad Data"
      })
    } else {
      var bareerToken = req.headers['authorization'].split(' ')[1];
      var decoded = jwt.verify(bareerToken, secret);
      Todo.findOne({
        where: {
          user_id: decoded.id,
          id: req.params.id
        }
      })
      .then(task => {
        if(task) {
          task.update(
            {title: req.body.title, isDone: req.body.isDone},
            {where: {id: req.params.id}}
          )
          .then(() => {
            res.json({status: "success", message: 'Task Updated!'})
          })
          .catch(err => {
            res.send("error: " + err)
          })
        } else {
          res.json({status: "failed", message: "Task not found"})
        }
      })
      .catch(err => {
        res.json({status: "failed", message: "Task not found"})
      })
    }
  } else {
    res.json({status: "failed", message: "Token not passed"})
  }
}

// Delete a TODO task
exports.deleteById = (req, res) => {
  if (req.headers['authorization']){
    var bareerToken = req.headers['authorization'].split(' ')[1];
    var decoded  = jwt.verify(bareerToken, secret);
    Todo.findOne({
      where: {
        user_id: decoded.id,
        id: req.params.id
      }
    })
    .then(task => {
      if (task) {
        Todo.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(() => {
          res.json({status: "Task Deleted"})
        })
        .catch(err => {
          res.send("error: " + err)
        })
      } else {
        res.json({ status: "failed", message: "Task not found"})
      }
    })
    .catch(err => {
      res.json({ status: "failed", message: "Task not found" })
    })
  } else {
    res.json({status: "failed", message: "Token not passed !"})
  }
}


