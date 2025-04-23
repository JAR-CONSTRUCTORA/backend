const Task = require("../models/task");

const createTask = async (req, res) => {
  const { description, location, estimatedTime, assignees } = req.body;
  try {
    const newTask = new Task({
      description,
      location,
      estimatedTime,
      assignees,
    });
    await newTask.save();
    res.json({
      message: "Tarea creada. Se les notificara a los trabajadores.",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const getTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.findOne({ assignees: id });
    if (tasks) {
      res.json({
        message: tasks,
      });
    } else {
      res.json({
        message: "No tasks!",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
module.exports = { createTask, getTasks };
