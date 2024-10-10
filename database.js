const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

client.connect(); // Connect once at the start

module.exports = client; // Export the client instance
