const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
const Request = require("tedious").Request;

exports.addTask = (req) => {
  const qry =
    "INSERT INTO tasks (task_id, task_creation_dt, task_title, task_desc, task_completed, task_scheduled_dt, priority_id) " + 
    `VALUES (${req.params.task_id}, ${req.params.task_creation_dt}, ${req.params.task_title}, ${req.params.task_desc}, ` +
    `${req.params.task_completed}, ${req.params.task_scheduled_dt}, ${req.params.task_priority});`;
  const request = new Request(qry, (err) => {
    if (err) {
      console.log(err);
    } 
  });

  dbConnection(request);
};