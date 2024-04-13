const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
