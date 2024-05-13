const { mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
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
