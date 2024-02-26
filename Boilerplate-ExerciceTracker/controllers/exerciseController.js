const Exercise = require("../models/exercise");
const User = require("../models/user");
const mongoose = require("mongoose");

const addExercise = async (req, res) => {
  try {
    const { description, duration, date } = req.body;
    const checkUser = await User.findById(req.body[":_id"]);
    console.log(checkUser);
    const newExercise = new Exercise({
      username: checkUser.username,
      date: date,
      duration: duration,
      description: description,
    });

    const savedExercise = await newExercise.save();
    return res.json({
      _id: savedExercise._id,
      username: savedExercise.username,
      date: savedExercise.date,
      duration: savedExercise.duration,
      description: savedExercise.description,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "User not found." });
  }
};

const getDateExercise = async (req, res) => {};

module.exports = {
  addExercise,
  getDateExercise,
};
