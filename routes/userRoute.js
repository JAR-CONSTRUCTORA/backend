const express = require("express");
const {
  createUser,
  getWorkers,
  searchUser,
  unsuscribeUser,
} = require("../controllers/userController");

const router = express.Router();

router
  .post("/createUser", createUser)
  .get("/workers", getWorkers)
  .get("/search", searchUser)
  .put("/user/:id", unsuscribeUser);

module.exports = router;
