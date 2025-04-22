const User = require("../models/user");

const createUser = async (req, res) => {
  const { nombreUsuario, contrasena, nombre, apellido } = req.body;
  try {
    const newUser = new User({
      nombreUsuario,
      contrasena,
      nombre,
      apellido,
    });
    const user = await User.findOne({ nombreUsuario: nombreUsuario });
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

module.exports = { createUser };
