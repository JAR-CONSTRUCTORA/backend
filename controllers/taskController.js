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
      endDateTime: endDate,
    });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const durationInMilliseconds = endDate - task.startDateTime;
    const estimatedTimeInMs = task.estimatedTime * 3600000;
    const completedInTime = durationInMilliseconds <= estimatedTimeInMs;

    task.completedOnTime = completedInTime;
    await task.save();

    res.status(200).json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

module.exports = { createTask, getTasks, startTask, endTask };
