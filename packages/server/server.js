const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

require("./routes/todo.js")(app);
app.listen(PORT, ()=> console.log('server started'));