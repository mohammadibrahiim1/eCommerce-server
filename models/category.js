const { mongoose } = require("mongoose");

const subCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: { type: String },
});

const childCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  children: [subCategory],
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  parentName: { type: String },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  children: [childCategory],
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
