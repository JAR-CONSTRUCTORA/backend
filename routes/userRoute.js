const express = require("express");
const {
  createUser,
  getWorkers,
  searchUser,
} = require("../controllers/userController");

const router = express.Router();

router
  .post("/createUser", createUser)
  .get("/workers", getWorkers)
  .get("/search", searchUser);

module.exports = router;
