const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  addedCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  addedTags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

module.exports = mongoose.model("Admin", adminSchema);
