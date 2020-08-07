const dbConnection = require("../dbConnection/dbConnection.js");

module.exports = (req, res) => {
  const { taskTitle } = req.params;

  const qry =
    `INSERT INTO tasks (task_title, task_desc) 
     VALUES ('${taskTitle}', '');`;

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
