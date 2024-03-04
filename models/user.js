const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: {
    type: String,
    required: [true, "Please provide an Email"],
    // unique: [true, "Email Exists"],
  },
  email: {
    type: String,
    required: [true, "Please provide a password"],
    // unique: false,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
