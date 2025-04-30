const User = require("../models/user");

const createUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
    });
    const user = await User.findOne({ username });
    if (user) {
      res.json({
        message: "Usuario ya existe, proba otro nombre de usuario!",
      });
    } else {
      newUser.save();
      res.json({
        message: "Usuario creado exitosamente!",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const getWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "Employee" });
    if (workers) {
      res.json({
        workers,
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports = { createUser, getWorkers };
