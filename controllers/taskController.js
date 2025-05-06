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
    const tasks = await Task.find({ assignees: id });
    console.log(tasks);
    if (tasks) {
      res.json({
        tasks,
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

const startTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const date = new Date();
    const task = await Task.findByIdAndUpdate(id, {
      status: "In progress",
      startDateTime: date,
    });
    await task.save();
    res.json({
      message: "Task started!",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const endTask = async (req, res) => {
  const { id } = req.params;
  try {
    const endDate = new Date();
    const task = await Task.findByIdAndUpdate(id, {
      status: "Completed",
    });
    const durationInMinutes = Math.floor(
      (endDate - task.startDateTime) / 60000
    );
    const completedInTime = durationInMinutes <= task.estimatedTime;
    if (completedInTime === true) {
      task.endDateTime = endDate;
      task.completedOnTime = true;
      await task.save();
    } else {
      task.endDateTime = endDate;
      task.completedOnTime = false;
      await task.save();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createTask, getTasks, startTask, endTask };
