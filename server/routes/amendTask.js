const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
const Request = require("tedious").Request;

function getQrySQL({ taskID, fieldName, newValue }) {
  let qry;

  // handle diff data types in qry string
  if (fieldName === "priority_desc") {
    qry =
      `UPDATE tasks SET tasks.priority_id = (SELECT task_priorities.priority_id FROM task_priorities` +
      ` WHERE task_priorities.priority_desc = '${newValue}') WHERE tasks.task_id = ${taskID};`;
  } else if (fieldName === "task_completed") {
    qry = `UPDATE tasks SET task_completed = ${newValue} WHERE task_id = ${taskID};`;
  } else {
    qry = `UPDATE tasks SET ${fieldName} = '${newValue}' WHERE task_id = ${taskID};`;
  }

  return qry;
}

exports.amendTask = req => {
  const qry = getQrySQL(req.params);

  const request = new Request(qry, err => {
    if (err) {
      // need to inform user of error (ie send to client)?
      console.log(err);
    }
  });

  dbConnection(request);
};
