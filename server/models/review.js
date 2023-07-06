const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    user: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
    content: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
