const dbConnection = require("../dbConnection/dbConnection.js");

module.exports = (req, res) => {
  const { orderByField } = req.params;
  const direction = req.params.direction === "Descending" ? "DESC" : "ASC";
  const orderBy =
    orderByField === "task_creation_dt"
      ? `${orderByField} ${direction}`
      : `${orderByField} ${direction} NULLS LAST, task_creation_dt DESC`;

  const qry = `SELECT task_id, 
            task_creation_dt, 
            task_title, 
            task_desc, 
            task_completed, 
            task_scheduled_dt, 
            priority_desc 
     FROM tasks 
     LEFT JOIN task_priorities ON tasks.priority_id = task_priorities.priority_id 
     ORDER BY ${orderBy};`;

  const client = dbConnection();

  client.query(qry, (err, qryResults) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(JSON.stringify(qryResults.rows));
    }
    client.end();
  });
};
