const mongoose = require("mongoose");

const user = new mongoose.Schema({
  nombre: { type: String },
  apellido: { type: String },
  rol: { type: String, enum: ["Empleador", "Empleado"] },
  tareas: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tarea",
    },
  ],
});

module.exports = mongoose.model("User", user);
