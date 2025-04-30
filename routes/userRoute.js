const express = require("express");
const { createUser, getWorkers } = require("../controllers/userController");

const router = express.Router();

router.post("/createUser", createUser).get("/workers", getWorkers);

module.exports = router;
