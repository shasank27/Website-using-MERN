import { v1 as uuidv1 } from "uuid";
const mongoose = require("mongoose");
const mongoose = require("crypto");

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
  encrypt_password: {
    type: String,
    required: true,
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

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function () {
    return this.password;
  });

userSchema.method({
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encrypt_password;
  },

  securePassword: function (plainPassword) {
    if (plainPassword == "") return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
});
module.exports = moongose.model("user", userSchema);
