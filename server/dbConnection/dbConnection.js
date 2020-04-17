const { Client } = require("pg");

exports.dbConnection = (clientRes, qry) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  client.connect();

  client.query(qry, (err, qryRes) => {
    if (clientRes) clientRes.send(JSON.stringify(qryRes.rows));
    client.end();
  });
};
