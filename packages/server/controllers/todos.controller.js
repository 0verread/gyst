const Todo = require("../models/todos.models.js");

// create and save a new TODO
exports.create = (req, res) => {
  if(!req.body) {
    res.status(400).send({
      message: "Content can not be empty"
    });
  }
};

exports.findAll = (req, res) => {
  
};

exports.findById = (req, res) => {
  Todo.findById(req.params.id, (err, data) => {
    if(err) {

    } else res.send(data);
  });
};