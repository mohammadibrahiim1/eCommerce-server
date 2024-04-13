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

  paymentOption: {
    type: String,
    enum: ["COD", "creditCard"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "confirmed", "shipped", "delivered"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    default: null,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
