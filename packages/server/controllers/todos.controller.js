const Todo = require("../models/todos.model.js");

// create and save a new TODO

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {

};

exports.findById = (req, res) => {
  Todo.findById(req.params.id, (err, data) => {
    if(err) {

    } else res.send(data);
  });
};