const express = require("express");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js").getAllTasks;
// || process.env.PORT?
const port = 3000;

// need to work out error handling & responses to client

app.get('/', (req, res) => {
    getAllTasks(res);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));