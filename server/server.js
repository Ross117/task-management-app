const express = require("express");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js").getAllTasks;
const deleteTask = require("./routes/deleteTask.js").deleteTask;
const addTask = require("./routes/addTask.js").addTask;
const amendTask = require("./routes/amendTask.js").amendTask;
// || process.env.PORT?
const port = 3000;

// need to work out error handling & responses to client

app.get("/", (req, res) => {
  getAllTasks(res);
});

// need to set taskID as request parameter
app.delete("/", (req) => {
  deleteTask(req);
});

app.post("/", (req) => {
  addTask(req);
});

app.put("/", (req) => {
  amendTask(req);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));