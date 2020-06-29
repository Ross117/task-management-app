const { Client } = require("pg");

module.exports = (clientRes, qry) => {
  let client;

  if (process.env.NODE_ENV === "development") {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
  } else {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }

  client.connect();

  client.query(qry, (err, qryRes) => {
    if (clientRes) clientRes.send(JSON.stringify(qryRes.rows));
    client.end();
  });
};
