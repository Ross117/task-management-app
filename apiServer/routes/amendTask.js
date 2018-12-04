const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
const Request = require("tedious").Request;

exports.amendTask = (req) => {
//   need to handle several updates at once?

  const { taskID, field, value} = req.params;  

  const qry =
    `UPDATE tasks SET {field} = {value} WHERE task_id = {taskID};`;
  const request = new Request(qry, (err) => {
    if (err) {
      console.log(err);
    } 
  });

  dbConnection(request);
};