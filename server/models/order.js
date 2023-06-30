const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    madeBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
    ,
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
