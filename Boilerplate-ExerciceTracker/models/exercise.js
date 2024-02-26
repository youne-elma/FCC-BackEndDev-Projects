const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  duration: {
    type: Number,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
