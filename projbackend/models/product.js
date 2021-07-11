const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
