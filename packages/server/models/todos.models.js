// This contain CURD operation

const sql = require("./db.js");

// constructor
const Todo = function(todo) {
  this.title = todo.title;
  this.isDone = todo.isDone;
  this.description = todo.description;
  this.date = todo.date;
  this.author = todo.author;
};

Todo.create = (newTodo, result) => {
  sql.query("INSERT INTO todolist SET ?", newTodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Todo: ", {id: res.insertId, ...newTodo});
    result(null, {id: res.insertId, ...newTodo});
  });
};

Todo.findAll = (title, result) => {
  let query = "SELECT * FROM todolist";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todos: ", res);
    result(null, res);
  });
}

