const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  addedBy: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
  category: [
    { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  ],

  tag: [{ type: mongoose.Types.ObjectId, ref: "Tag", required: true }],
});

module.exports = mongoose.model("Product", productSchema);
