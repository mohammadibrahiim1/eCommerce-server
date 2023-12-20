const Category = require("../models/category");

const createCategory = async (req, res) => {
  try {
    // extract category data from the request body
    const { name, imageUrl } = req.body;

    // create a new category instance
    const newCategory = new Category({
      name,
      imageUrl,
    });

    // save the category to the database
    const savedCategory = await newCategory.save();

    // respond with the saved category
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createCategory };
