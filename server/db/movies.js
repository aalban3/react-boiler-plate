const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("./database");

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  review: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  score: {
    type: Sequelize.NUMBER,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

module.exports = Movie;
