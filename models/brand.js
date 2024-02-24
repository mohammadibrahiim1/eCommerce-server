const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
