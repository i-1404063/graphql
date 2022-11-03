require("dotenv").config();
const { Pool } = require("pg");
module.exports = new Pool({
  user: "postgres",
  host: "localhost",
  database: "graphql",
  password: "postgres",
  port: 5431,
  max: 10, // maximum 10 connection will remain open
  connectionTimeoutMillis: 3000, // it will take max 3s to connect to db,,if exceeds connection will timeout
  idleTimeoutMillis: 4000, // maximum 4s will be idle in connection pool
  allowExitOnIdle: true, // if all connection is idle, node event loop will exit
});
