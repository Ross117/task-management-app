// const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
// const Request = require("tedious").Request;

// exports.addTask = (req, res) => {
//   const { taskTitle } = req.params;

//   const qry =
//     `INSERT INTO tasks (task_id, task_creation_dt, task_title, task_desc, task_completed, task_scheduled_dt, priority_id) ` +
//     `VALUES (NEXT VALUE FOR tasks_seq, GETDATE(), '${taskTitle}', '', 0, GETDATE(), 3);`;

//   const request = new Request(qry, err => {
//     if (err) {
//       console.log(err);
//     }
//   });

//   dbConnection(request);
// };
