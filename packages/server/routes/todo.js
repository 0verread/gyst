const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodoById,
  getTodo
} = require("../controllers/Todo");

router.param("todoId", getTodoById);

router.get("/todo/:todoId/", getTodo);

router.post("/todo/create/", createTodo);