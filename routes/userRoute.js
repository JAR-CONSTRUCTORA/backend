const express = require("express");
const {
  createUser,
  getWorkers,
  searchUser,
  unsuscribeUser,
  getUnsubscribedUsers,
} = require("../controllers/userController");

const router = express.Router();

router
  .post("/createUser", createUser)
  .get("/workers", getWorkers)
  .get("/search", searchUser)
  .put("/unsubscribe/:id", unsuscribeUser)
  .get("/unsubscribe", getUnsubscribedUsers);

module.exports = router;
