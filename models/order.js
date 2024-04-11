const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  items: {},
  // itemPrice: {
  //   type: Number,
  //   required: true,
  // },
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
  paymentOption: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const orderSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//   },
//   address: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   state: {
//     type: String,
//   },
//   postalCode: {
//     type: String,
//   },
//   price: {
//     type: Number,
//   },
//   // trans_id: {
//   //   type: String,
//   //   required: true,
//   // },
//   // product_name: {
//   //   type: String,
//   //   required: true,
//   // },
//   // product_category: {
//   //   type: String,
//   //   required: true,
//   // },
// });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
