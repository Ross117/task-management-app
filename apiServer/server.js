const express = require("express");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js").getAllTasks;
const deleteTask = require("./routes/deleteTask.js").deleteTask;
const addTask = require("./routes/addTask.js").addTask;
const amendTask = require("./routes/amendTask.js").amendTask;
// || process.env.PORT?
const port = 8080;

// need to work out error handling & responses to client

app.get("/allTasks", (req, res) => {
  getAllTasks(res);
});

app.put("/amendTask/:taskID/field/:fieldName/value/:newValue", (req) => {
  amendTask(req);
});

// need to set taskID as request parameter
app.delete("/deleteTask", (req) => {
  deleteTask(req);
});

app.post("/addTask", (req) => {
  addTask(req);
});

app.listen(port, () => console.log(`API server listening on port ${port}!`));