const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");
require("dotenv").config();

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://Alan@localhost:5432/${databaseName}`,
  {
    logging: false, // unless you like the logs
    // ...and there are many other options you may want to play with
  }
);

module.exports = db;
