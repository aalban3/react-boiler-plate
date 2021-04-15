const router = require("express").Router();
const { User } = require("../db");

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

// POST /auth/signup
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

// GET /auth/me
router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
