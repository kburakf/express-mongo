const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: String,
  price: Number,
  description: String,
  pic: String
}, {
  collection: "products"
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;