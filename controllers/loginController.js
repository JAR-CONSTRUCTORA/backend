require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userLogged = await User.findOne({ username });
    if (!userLogged) {
      res.status(401).json({
        message: "User not found!",
      });
    }
    if (userLogged.password != password) {
      res.status(401).json({
        message: "Username or password incorrect",
      });
    } else {
      const token = jwt.sign({ userLogged }, SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log(token);
      res.json({
        message: "Login successfully!",
        userLogged,
        token,
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports = { login };
