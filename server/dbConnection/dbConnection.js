const { Client } = require("pg");

module.exports = () => {
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

  return client;
};
