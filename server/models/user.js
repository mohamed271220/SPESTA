const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");
// const findOrCreate = require("mongoose-findorcreate");
const userSchema = new Schema(
  {
    name: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true, min: 2, max: 50 },
    password: { type: String, required: true, minlength: 6 },
    address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
    image: {
      type: String,
      required: false,
      default:
        "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    },
    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        number: {
          type: Number,
        },
        price: {
          type: Number,
        },
        name: {
          type: String,
        },
        sale: { type: Number },
        image: { type: String },
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    // status: { type: String, required: true, default: "USER" },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
