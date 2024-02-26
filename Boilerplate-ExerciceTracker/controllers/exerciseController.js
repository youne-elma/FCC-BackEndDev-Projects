const Exercise = require("../models/exercise");
const User = require("../models/user");
const mongoose = require("mongoose");

const addExercise = async (req, res) => {
  try {
    const { description, duration, date } = req.body;
    const checkUser = await User.findById(req.params._id);

    if (!checkUser) {
      return res.status(500).json({ message: "User not found" });
    } else {
      const newExercise = new Exercise({
        username: checkUser.username,
        date: date ? new Date(date) : new Date(),
        duration: duration,
        description: description,
      });

      const savedExercise = await newExercise.save();
      return res.json({
        _id: checkUser._id,
        username: savedExercise.username,
        date: new Date(savedExercise.date).toDateString(),
        duration: savedExercise.duration,
        description: savedExercise.description,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error saving the exercise" });
  }
};

const getExercises = async (req, res) => {
  const { from, to, limit } = req.query;
  const id = req.params._id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(500).json({ message: "Could not find the user" });
    }
    let dateObj = {};
    if (from) {
      dateObj["$gte"] = new Date(from);
    }
    if (to) {
      dateObj["$lte"] = new Date(to);
    }

    let filter = {
      username: user.username,
    };
    if (from || to) {
      filter.date = dateObj;
    }

    console.log(filter);

    const exercises = await Exercise.find(filter).limit(+limit ?? 500);
    const log = exercises.map((e) => ({
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString(),
    }));

    return res.json({
      username: user.username,
      count: exercises.length,
      _id: user._id,
      log: log,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "There was an error" });
  }
};

module.exports = {
  addExercise,
  getExercises,
};
