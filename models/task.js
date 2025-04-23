const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: { type: String },
  location: { type: String },
  estimatedTime: { type: Number },
  startDateTime: { type: Date },
  endDateTime: { type: Date },
  status: {
    type: String,
    enum: ["Completed", "In Progress", "Pending"],
    default: "Pending",
  },
  assignees: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  completedOnTime: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
