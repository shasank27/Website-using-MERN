const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: 32,
  },

  email: {
    type: String,
    trim: true,
    unique: true,
  },
  //TODO:
  password: {
    type: String,
    trim: true,
  },
  salt: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
});

module.exports = moongose.model("user", userSchema);
