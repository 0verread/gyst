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

app.use("/api", todoRoutes);


// app.get('/', (req, res) => {
//   res.send("Hello World")
// })




app.listen(3000, ()=> console.log('server started'));