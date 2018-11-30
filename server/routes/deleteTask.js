const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
const Request = require("tedious").Request;

exports.deleteTask = (req) => {
  const qry =
    `DELETE FROM tasks WHERE task_id = ${req.params.taskID};`;
  const request = new Request(qry, (err) => {
    if (err) {
      console.log(err);
    } 
  });

  dbConnection(request);
};