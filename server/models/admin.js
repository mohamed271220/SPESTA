const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adminKey: { type: String, required: true },
  addedProducts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  addedCategories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  addedTags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
  ],
});
adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Admin", adminSchema);
