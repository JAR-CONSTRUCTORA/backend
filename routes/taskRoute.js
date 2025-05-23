const express = require("express");
const {
  createTask,
  getTasks,
  startTask,
  endTask,
  getAllTasks,
  editTask,
  createNote,
} = require("../controllers/taskController");

const router = express.Router();

router
  .get("", getAllTasks)
  .get("/getTasks/:id", getTasks)
  .post("/createTask", createTask)
  .put("/startTask/:id", startTask)
  .put("/endTask/:id", endTask)
  .put("/editTask/:id", editTask)
  .put("/sendnote/:id", createNote);

module.exports = router;
