const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());

// TODO: CURD operation
/**
 * 1. GET / -> fetch all todo
 * 2. POST / -> create a new task
 * 3. PUT /:id -> update task
 * 4. DELETE /:id -> Delete a task
 * */ 

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "hello world"});
})

const PORT = process.env.PORT || 8080;

require("./routes/todo.js")(app);
app.listen(PORT, ()=> console.log('server started'));