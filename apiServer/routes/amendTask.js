const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
const Request = require("tedious").Request;

exports.amendTask = (req) => {
  const { taskID, fieldName, newValue } = req.params; 
  let qry;

  // handle diff data types in qry string
  if (fieldName === "priority_desc") {
    qry = `UPDATE tasks SET tasks.priority_id = (SELECT task_priorities.priority_id FROM task_priorities WHERE task_priorities.priority_desc = '${newValue}') WHERE tasks.task_id = ${taskID};`;
  } else if (fieldName === "task_completed") {
    qry = `UPDATE tasks SET task_completed = ${newValue} WHERE task_id = ${taskID};`;
  } else {b
    qry = `UPDATE tasks SET ${fieldName} = '${newValue}' WHERE task_id = ${taskID};`;
  }
  
  const request = new Request(qry, (err) => {
    if (err) {
      // need to inform user to error (ie sent to client)?
      console.log(err);
    } 
  });

  dbConnection(request);
};