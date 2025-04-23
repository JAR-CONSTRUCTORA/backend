const express = require("express");
const {
  createTask,
  getTasks,
  startTask,
  endTask,
} = require("../controllers/taskController");

const router = express.Router();

router
  .get("/getTasks/:id", getTasks)
  .post("/createTask", createTask)
  .put("/startTask/:id", startTask)
  .put("/endTask/:id", endTask);

module.exports = router;
