const Category = require("../models/product");

const createCategory = async (req, res) => {
  const response = await Category.create(req.body);
  // console.log(response);
  res.send(response);
};

module.exports = { createCategory };
