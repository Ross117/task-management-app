const express = require("express");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js").getAllTasks;
const addTask = require("./routes/addTask.js").addTask;
const amendTask = require("./routes/amendTask.js").amendTask;
// || process.env.PORT?
const port = 8080;

// need to work out error handling & responses to client

app.get("/allTasks", (req, res) => {
  getAllTasks(res);
});

app.put("/amendTask/:taskID/field/:fieldName/value/:newValue", req => {
  amendTask(req);
});

app.post("/addTask", req => {
  addTask(req);
});

app.listen(port, () => console.log(`API server listening on port ${port}!`));
