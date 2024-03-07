const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
