require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const userLogged = await User.findOne({ username: username });
    console.log(userLogged);
    if (!userLogged) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    if (userLogged.password != password) {
      return res.status(401).json({
        message: "Credentials invalids",
      });
    } else {
      const token = jwt.sign({ userLogged }, SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log(token);
      return res.json({
        message: "Login successfully!",
        userLogged,
        token,
      });
    }
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

module.exports = { login };
