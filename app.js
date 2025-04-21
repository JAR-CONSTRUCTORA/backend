require("./database/db");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const testRouter = require("./routes/testRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/", testRouter);
mongoose.set("strictQuery", true);

module.exports = app;
