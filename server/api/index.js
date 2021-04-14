const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, "../../public")));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.us("/api", require("./auth"));
// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// error handling middleware
app.use((req, res, next) => {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
