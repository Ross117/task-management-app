const express = require("express");
const path = require("path");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js");
const addTask = require("./routes/addTask.js");
const amendTask = require("./routes/amendTask.js");
const deleteTask = require("./routes/deleteTask.js");
const port = process.env.PORT;

app.get("/allTasks/:orderByField/:direction", (req, res) => {
  getAllTasks(req, res);
});

app.put("/amendTask/:taskID/field/:fieldName/value/:newValue", (req, res) => {
  amendTask(req, res);
});

app.post("/addTask/:taskTitle", (req, res) => {
  addTask(req, res);
});

app.delete("/deleteTask/:taskID", (req, res) => {
  deleteTask(req, res);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port);
