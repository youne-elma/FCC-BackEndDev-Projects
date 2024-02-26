const User = require("../models/user");
const mongoose = require("mongoose");

const addUser = async (req, res) => {
  console.log(req.body);
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
};
