const Task = require("../models/task");

const createTask = async (req, res) => {
  const {
    estacion,
    incidencia,
    description,
    location,
    estimatedTime,
    assignees,
  } = req.body;
  try {
    const taskData = {
      estacion,
      description,
      location,
      estimatedTime,
      assignees,
    };

    if (incidencia) {
      taskData.incidencia = incidencia;
    }

    const newTask = new Task(taskData);
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
  const { status } = req.query;
  const filter = status ? { assignees: id, status } : { assignees: id };
  try {
    const tasks = await Task.find(filter);
    if (tasks) {
      res.json({
        tasks,
      });
    } else {
      res.json({
        message: "No hay tareas registradas",
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
      status: "En progreso",
      startDateTime: date,
    });
    await task.save();
    res.json({
      message: "Se empezo la tarea!",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
const endTask = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  try {
    const endDate = new Date();
    const task = await Task.findByIdAndUpdate(id, {
      status: "Completada",
      endDateTime: endDate,
      note,
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

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({}).populate(
      "assignees",
      "firstName lastName"
    );
    if (allTasks) {
      res.json({
        allTasks,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { description, location, estacion, assignees } = req.body;
  try {
    const task = await Task.findById(id);
    if (task & (task.status === "Completada")) {
      return res.json({
        message: "Esta tarea ya se ha realizado, no es posible editar!",
      });
    } else {
      await task.updateOne({
        description,
        location,
        estacion,
        assignees,
      });
      await task.save();
      res.json({
        message: "Tarea actualizada correctamente!",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

const createNote = async (req, res) => {
  const { id } = req.params;
  const { idSender, content } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, {
      note: {
        sender: idSender,
        content,
      },
    });
    await task.save();
    res.json({
      message: "Se envio la nota",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  startTask,
  endTask,
  getAllTasks,
  editTask,
  createNote,
};
