const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
  rating: {
    type: Number,
    max:5
  },
  images: [
    {
      type: String,
      // required: true,
    },
  ],
  addedBy: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
  category: [{ type: mongoose.Types.ObjectId, ref: "Category" }],

  tag: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  sale: {
    type: Number,
    max: 1.0,
    default: 0,
  },
  status: {
    type: String,
    default: "available",
  },
});

module.exports = mongoose.model("Product", productSchema);
