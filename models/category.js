const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    en: String,
  },
  parentName: String,
  description: {
    en: String,
  },
  status: String,
  children: [
    {
      name: {
        en: String,
      },
      parentId: Boolean,
      parentName: String,
      description: {
        en: String,
      },

      imageUrl: {
        type: String,
      },

      status: String,
      children: [
        {
          name: {
            en: String,
          },
          parentId: Boolean,
          parentName: String,
          description: {
            en: String,
          },
          icon: String,
          status: String,
          children: [],
        },
      ],
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
