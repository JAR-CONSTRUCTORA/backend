const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  station: { type: String },
  incidencia: { type: Number },
  description: { type: String },
  location: { type: String },
  estimatedTime: { type: Number },
  startDateTime: { type: Date },
  endDateTime: { type: Date },
  status: {
    type: String,
    enum: ["Completada", "En progreso", "Pendiente"],
    default: "Pendiente",
  },
  note: {
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },
    content: { type: String },
  },
  assignees: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  completedOnTime: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
