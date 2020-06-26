const { Client } = require("pg");
const localDbConnectionString = require("../../localDb/localDbCredentials");

module.exports = (clientRes, qry) => {
  let client;
  if (process.env.DATABASE_URL) {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  } else {
    client = new Client({
      connectionString: localDbConnectionString,
    });
  }

  client.connect();

  client.query(qry, (err, qryRes) => {
    if (clientRes) clientRes.send(JSON.stringify(qryRes.rows));
    client.end();
  });
};
