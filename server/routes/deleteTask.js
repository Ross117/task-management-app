const dbConnection = require("../dbConnection/dbConnection.js");

module.exports = (req, res) => {
  const { taskID } = req.params;

  const qry = `DELETE FROM tasks WHERE task_ID = ${taskID};`;

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