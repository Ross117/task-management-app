const express = require("express");
const app = express();
const getAllTasks = require("./routes/getAllTasks.js").getAllTasks;
const port = 3000;

// install nodemon as a dev dependency?

getAllTasks();

app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));