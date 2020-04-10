const { Client } = require("pg");
const connectionString = require("./connectionString.js").connectionString();

const client = new Client({
  connectionString: process.env.DATABASE_URL || connectionString,
  ssl: { rejectUnauthorized: false },
});

client.connect();

client.query("SELECT * FROM tasks;", (err, res) => {

  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }  
  client.end();
});



// const Connection = require("tedious").Connection;

// exports.dbConnection = request => {
//   const connection = new Connection(config);

//   connection.on("connect", err => {
//     if (err) {
//       console.log(err);
//     } else {
//       connection.execSql(request);
//       connection.close;
//     }
//   });
// };
