const Connection = require("tedious").Connection;

const config = {
  userName: "ross_wr_54",
  password: "k32!IW0Nm@HG",
  server: "tasksappserver.database.windows.net",
  options: {
    database: "tasksAppDatabase",
    encrypt: true,
    rowCollectionOnRequestCompletion: true
  }
};

exports.dbConnection = request => {
  const connection = new Connection(config);

  connection.on("connect", err => {
    if (err) {
      console.log(err);
    } else {
      connection.execSql(request);
      connection.close;
    }
  });
};
