const dbConnection = require("../dbConnection/dbConnection.js");

function getQrySQL({ taskID, fieldName, newValue }) {
  let qry;

  if (fieldName === "priority_desc") {
    qry =
      `UPDATE tasks SET priority_id = (SELECT task_priorities.priority_id FROM task_priorities` +
      ` WHERE task_priorities.priority_desc = '${newValue}') WHERE tasks.task_id = ${taskID};`;
  } else {
    qry = `UPDATE tasks SET ${fieldName} = '${newValue}' WHERE task_id = ${taskID};`;
  }

  return qry;
}

module.exports = (req) => {
  const qry = getQrySQL(req.params);

  dbConnection(null, qry);
};
