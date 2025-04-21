const mongoose = require("mongoose");

const tarea = mongoose.Schema({
  descripcion: { type: String },
  lugar: { type: String },
  tiempoEstimado: { type: Number },
  fecha_hora_inicio: { type: Date },
  fecha_hora_fin: { type: Date },
  status: {
    type: String,
    enum: ["Completado", "En curso", "Pendiente"],
    default: "Pendiente",
  },
});

module.exports = mongoose.model("Tarea", tarea);
