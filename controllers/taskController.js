const Task = require("../models/task");

const createTask = async (req, res) => {
  const { descripcion, lugar, tiempoEstimado, encargados } = req.body;
  try {
    const newTask = new Task({
      descripcion,
      lugar,
      tiempoEstimado,
      encargados,
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

module.exports = { createTask };
