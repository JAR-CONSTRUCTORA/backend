const express = require("express");
const { createTask, getTasks } = require("../controllers/taskController");

const router = express.Router();

router.get("/getTasks/:id", getTasks).post("/createTask", createTask);

module.exports = router;
