const router = require("express").Router();
const { User } = require("../db");

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

// POST /api/login
router.post("/login", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

// GET /api/login
router.get("/login", requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

// POST /api/signup
router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});
module.exports = router;
