const { mongoose } = require("mongoose");

const childSubCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});
const childCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },

  subCategories: [childSubCategory],
});

const subCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },

  subCategories: [childCategory],
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  subCategories: [subCategory],
});

// mongoose middlewares for saving data: pre/post

// categorySchema.pre("save", function (next) {
//   console.log("Before saving data");

//   // this =>
//   if (this.rating == 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

categorySchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});

categorySchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
