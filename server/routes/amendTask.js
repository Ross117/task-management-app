const dbConnection = require("../dbConnection/dbConnection.js");

function getQrySQL({ taskID, fieldName, newValue }) {
  let qry;

  if (fieldName === "priority_desc") {
    qry = `UPDATE tasks 
       SET priority_id = 
       (SELECT task_priorities.priority_id 
         FROM task_priorities
         WHERE task_priorities.priority_desc = '${newValue}') 
       WHERE tasks.task_id = ${taskID};`;
  } else {
    if (fieldName === "task_scheduled_dt" && newValue === "null") {
      qry = `UPDATE tasks 
        SET ${fieldName} = NULL
        WHERE task_id = ${taskID};`;
    } else {
      qry = `UPDATE tasks
        SET ${fieldName} = '${newValue === "null" ? "" : newValue}'
        WHERE task_id = ${taskID};`;
    }
  }

  return qry;
}

module.exports = (req, res) => {
  const qry = getQrySQL(req.params);
  const client = dbConnection();

  client.query(qry, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
    client.end();
  });
};
