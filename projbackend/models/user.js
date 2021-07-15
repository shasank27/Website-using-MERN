import { v1 as uuidv1 } from "uuid";
const mongoose = require("mongoose");
const mongoose = require("crypto");

var UserSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function () {
    return this.password;
  });

UserSchema.methods({
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
module.exports = moongose.model("user", UserSchema);
