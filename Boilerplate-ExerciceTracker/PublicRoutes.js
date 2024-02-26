const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");
const exerciseController = require("./controllers/exerciseController");

router.post("/api/users", userController.addUser);
router.get("/api/users", userController.getUsers);
router.post("/api/users/:_id/exercises", exerciseController.addExercise);
router.get("/api/users/:_id/logs", exerciseController.getExercises);

module.exports = router;
