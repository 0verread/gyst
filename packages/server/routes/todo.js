module.exports = app => {
  const todos = require('../controllers/todos.controller.js');

  var router  = require("express").Router();

  // Create a new TODO
  router.post("/". todos.create);

  // Fetch all TODOs
  router.get("/", todos.findAll);

  // Fetch a single TODO
  router.get("/:id", todos.findById);

  // Update a TODO with id
  router.put("/:id", todos.updateById);

  // Delete a TODO by Id
  router.delete("/:id", todos.deleteById);

  // Delete all TODOs
  router.delete("/", todos.deleteAll);

  app.use('/api/todos', router);
}