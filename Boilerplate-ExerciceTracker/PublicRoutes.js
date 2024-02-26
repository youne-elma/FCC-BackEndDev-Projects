const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");
const exerciseController = require("./controllers/exerciseController");

router.post("/api/users", userController.addUser);
router.post("/api/users/:_id/exercises", exerciseController.addExercise);

module.exports = router;
