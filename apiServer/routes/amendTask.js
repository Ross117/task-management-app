const dbConnection = require("../dbConnection/dbConnection.js").dbConnection;
const Request = require("tedious").Request;

exports.amendTask = (req) => {
//   need to handle serveral updates at once?
  const qry =
    `UPDATE tasks SET ;`;
  const request = new Request(qry, (err) => {
    if (err) {
      console.log(err);
    } 
  });

  dbConnection(request);
};