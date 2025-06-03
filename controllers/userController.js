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

const searchUser = async (req, res) => {
  const { completeName } = req.query;
  const [firstName, lastName] = completeName.split(" ");
  const regexFirstName = new RegExp(`^${firstName}$`, "i");
  const regexLastName = new RegExp(`^${lastName}$`, "i");
  const query = {};
  if (firstName) query.firstName = regexFirstName;
  if (lastName) query.lastName = regexLastName;
  try {
    const userFounded = await User.find(query);
    if (userFounded) {
      res.json({
        userFounded,
      });
    } else {
      res.json({
        message: "No se encontro usuario.",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = { createUser, getWorkers, searchUser };
