const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
    validate: [
      (array) =>
        array.length !== 0 &&
        array.every((element) => {
          typeof element === "string";
        }),
      "At least one size ",
    ],
  },
  colors: {
    type: Array,
    required: true,
    validate: [
      (array) =>
        array.length !== 0 &&
        array.every((element) => {
          typeof element[keys[0]] === "string";
        }),
      "At least one size ",
    ],
  },
  brand: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("Products", productSchema, "products");

module.exports = Products;
