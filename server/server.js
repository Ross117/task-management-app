const express = require("express");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js").getAllTasks;
const port = 3000;

app.get('/', (req, res) => {
    getAllTasks(res);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));