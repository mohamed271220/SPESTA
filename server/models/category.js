const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String, required: true},
    addedBy: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
 
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }]


})

module.exports = mongoose.model("Category", categorySchema);