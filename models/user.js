const mongoose = require("mongoose");

const user = new mongoose.Schema({
  nombreUsuario: { type: String, unique: true },
  contrasena: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  rol: { type: String, enum: ["Empleador", "Empleado"], default: "Empleado" },
});

module.exports = mongoose.model("User", user);
