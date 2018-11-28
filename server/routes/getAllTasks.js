const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
const Request = require("tedious").Request;

exports.getAllTasks = () => {
  const qry =
    "SELECT task_id, task_creation_dt, task_name, task_desc, task_completed, task_scheduled_dt, priority_desc FROM tasks LEFT JOIN task_priorities ON tasks.priority_id = task_priorities.priority_id;";
  const request = new Request(qry, (err, rowCount, Row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(Row));
    }
  });

  const dbTasks = dbConnection();

  dbTasks.on('connect', err => {
    if (err) {
      console.log(err);
    } else {
      dbTasks.execSql(request);
      dbTasks.close;
    }
  });
}
  