const express = require("express");
const path = require("path");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js").getAllTasks;
const addTask = require("./routes/addTask.js").addTask;
const amendTask = require("./routes/amendTask.js").amendTask;
const port = process.env.PORT || 8080;

app.get("/allTasks", (req, res) => {
  getAllTasks(res);
});

// app.put("/amendTask/:taskID/field/:fieldName/value/:newValue", req => {
//   amendTask(req);
// });

// app.post("/addTask/:taskTitle", (req, res) => {
//   addTask(req, res);
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`API server listening on port ${port}!`));
