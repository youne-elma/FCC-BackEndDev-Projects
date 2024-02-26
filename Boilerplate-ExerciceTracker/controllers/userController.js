const User = require("../models/user");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("_id username");

    if (users.length === 0) {
      return res.json({ message: "No users" });
    } else {
      return res.json(users);
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error calling the users" });
  }
};

const addUser = async (req, res) => {
  const { username } = req.body;
  const newUser = new User({
    username: username,
  });
  try {
    const savedUser = await newUser.save();
    return res.json({ _id: savedUser._id, username: savedUser.username });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to add a user" });
  }
};

module.exports = {
  addUser,
  getUsers,
};
