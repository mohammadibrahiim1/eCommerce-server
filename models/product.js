const mongoose = require("mongoose");

// const specSchema = new mongoose.Schema({
//   processor: String,
//   motherboard: String,
//   ram: String,
//   graphics: String,
//   storage: String,
//   casing: String,
//   psu: String,
//   cooler: String,
// });

// const oilSpecSchema = new mongoose.Schema({
//   calories: String,
//   totalFat: String,
//   cholesterol: String,
//   sodium: String,
//   totalCarbohydrate: String,
//   protein: String,
// });

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discountPercentage: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    images: {},
  }

  // {
  //   model: {
  //     type: String,
  //     required: [true, "Please provide a name for this product.*"],
  //     trim: true,
  //     unique: [true, "Model must be unique"],
  //     minLength: [3, "Model must be at least 3 characters"],
  //     maxLength: [100, "Model is too large"],
  //   },
  //   // name: {
  //   //   type: String,
  //   //   required: [true, "Please provide a name for this product.*"],
  //   //   trim: true,
  //   //   unique: [true, "Model must be unique"],
  //   //   minLength: [3, "Model must be at least 3 characters"],
  //   //   maxLength: [100, "Model is too large"],
  //   // },
  //   image: {
  //     type: String,
  //     required: true,
  //   },
  //   keyFeature: {
  //     type: [String],
  //   },

  //   price: {
  //     type: Number,
  //     required: true,
  //     min: [0, "Price can't be negative"],
  //   },
  //   // unit: {
  //   //   type: String,
  //   //   required: true,
  //   //   enum: {
  //   //     values: ["kg", "litre", "pcs"],
  //   //     message: "Unit value can't be {VALUE}, must be kg/litre/pcs",
  //   //   },
  //   // },
  //   rating: {
  //     type: Number,
  //     required: true,
  //     min: [0, "Quantity can't be negative"],
  //     validate: {
  //       validator: (value) => {
  //         const isInteger = Number.isInteger(value);
  //         if (isInteger) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       },

  //       message: "Rating must be an integer",
  //     },
  //   },

  //   stock: {
  //     type: String,
  //   },

  //   brand: {
  //     type: String,
  //   },
  //   status: {
  //     type: String,
  //     enum: {
  //       values: ["in-stock", "out-of-stock,discontinued"],
  //       message: "Status can't be {VALUE}",
  //     },
  //   },
  //   // supplier: {
  //   //   type: mongoose.Schema.Types.ObjectId,
  //   //   ref: `Supplier`,
  //   // },
  //   category: {
  //     type: String,
  //     required: true,
  //   },
  //   // categories: [
  //   //   {
  //   //     name: {
  //   //       type: String,
  //   //       required: true,
  //   //     },
  //   //     _id: mongoose.Schema.Types.ObjectId,
  //   //   },
  //   // ],
  //   spec: [specSchema],
  //   // healthProductSpec: [oilSpecSchema],

  //   // createdAt: {
  //   //   type: Date,
  //   //   default: Date.now,
  //   // },
  //   // updatedAt: {
  //   //   type: Date,
  //   //   default: Date.now,
  //   // },
  // },
  // {
  //   timestamps: true,
  // }
);
// mongoose middlewares for saving data: pre/post

productSchema.pre("save", function (next) {
  console.log("Before saving data");

  // this =>
  if (this.rating == 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
