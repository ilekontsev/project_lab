const { Client } = require('pg')

const client = new Client({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "project_laba",
});

client.connect()


module.exports = client;