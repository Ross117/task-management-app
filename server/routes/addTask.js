const dbConnection = require("../dbConnection/dbConnection.js");

module.exports = (req) => {
  const { taskTitle } = req.params;

  const qry =
    `INSERT INTO tasks (task_title, task_desc) 
     VALUES ('${taskTitle}', '');`;

  dbConnection(null, qry);
};
