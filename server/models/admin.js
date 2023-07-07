const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: {
    type: String,
    require: false,
    default:
      "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
  },
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
  refreshToken: [String]
});
adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Admin", adminSchema);
