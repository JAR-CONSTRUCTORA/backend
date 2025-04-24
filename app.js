require("./database/db");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const loginRouter = require("./routes/loginRoute");
const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
mongoose.set("strictQuery", true);

module.exports = app;
