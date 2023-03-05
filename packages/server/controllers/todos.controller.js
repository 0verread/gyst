const todos = require("express").Router();
const cors = require("cors");

const Todo = require("../models/Todos.js");

todos.use(cors());


const taskXml = (task) => {
  var xmlRes = `<task>
                <title>${task.title}</title>
                <description>${task.description}</description>
                <status>${task.isDone}</status>
                </task>`;
  return xmlRes;
}

const formDataInXml = (data) => {
  let allTaskInxml = `<?xml version="1.0" encoding="UTF-8"?>` + 
                    `<todoList>`;
  if(Array.isArray(data)){
    data.forEach((task) => {
      allTaskInxml += taskXml(task);
    });
  } else {
    allTaskInxml += taskXml(data) 
  }
  allTaskInxml += `</todoList>`;
  return allTaskInxml;
}

const sendResponse = (req, res, data) => {
  if(req.accepts('application/xml')) {
    let dataInXml = formDataInXml(data);
    res.header("Content-Type", "application/xml");
    res.send(dataInXml);
  } else {
    res.json(data);
  }
}

// Create TODO task
exports.create = (req, result) => {
  if (!req.body.title && !req.body.isDone) {
    result.status(400);
    result.json({
      error: 'Bad data'
    })
  } else {
    Todo.create(req.body).then(data => {
      // result.json(data)
      sendResponse(req, result, data);
    })
    .catch(err => {
      result.json("error:" + err)
    })
  }
}

// Get all TODO tasks
exports.findAll = (req, res) => {
  Todo.findAll({})
  .then(tasks => {
    sendResponse(req, res, tasks);
  })
  .catch(err => {
    res.json("error: " + err);
  })
}

// Get a single TODO task by Id
exports.findById = (req, res) => {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(task => {
    if(task) {
      sendResponse(req, res, task)
    } else {
      res.send('Task does not exist')
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
}

// Update a TODO task by Id
exports.updateById = (req, res) => {
  if(!req.body.title && !req.body.isDone) {
    res.status(400)
    res.json({
      error: "Bad Data"
    })
  } else {
    Todo.findOne({
      where: {
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
}

// Delete a TODO task
exports.deleteById = (req, res) => {
  Todo.findOne({
    where: {
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
}


