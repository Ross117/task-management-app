const { Client } = require("pg");
// need to take below out of production build
const connectionString = require("./connectionString.js").connectionString();

exports.dbConnection = (clientRes, qry) => {
  const client = new Client({
    // need to take connectionString out of production build
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: { rejectUnauthorized: false },
  });

  client.connect();

  client.query(qry, (err, qryRes) => {
    clientRes.send(JSON.stringify(qryRes.rows));
    client.end();
  });
};