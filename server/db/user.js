const Sequelize = require("sequelize");
const db = require("./database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  githubId: {
    type: Sequelize.INTEGER,
  },
});

// beforeCreate hook
User.beforeCreate(async (user) => {
  //const hashedPassword = await bcrypt.hash(user.password, SALT_KEY);
  const hashedPassword = await hashPassword(user);
  user.password = hashedPassword;
});

// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  // should return true or false for if the entered password matches
  return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.generateToken = function () {
  // should sign a JWT token from an environment variable
  return jwt.sign({ id: this.id }, process.env.JWT);
};

// class methods
User.authenticate = async function ({ username, password }) {
  // this should find a user with the given username and determine if the password is valid for them
  const user = await this.findOne({ where: { username } });
  if (user && (await user.correctPassword(password))) {
    return user.generateToken();
  } else {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
};

User.findByToken = async function (token) {
  // verify the id on the token and find the corresponding user, otherwise throw an error
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "No User Found";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

// hooks
async function hashPassword(user) {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

module.exports = User;
