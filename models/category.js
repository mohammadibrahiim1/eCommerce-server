const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true, 
  },
  description: String,
  status: Number,
  thumb: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
