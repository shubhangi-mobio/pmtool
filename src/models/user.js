const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
    maxlength: 32
  },
  lastName: {
    type: String,
    unique: true,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  newPassword: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  token: {
    type: String,
  },
  role: {
    type: String,

  },

}, {
  timestamps: true

});

module.exports = mongoose.model("User", userSchema);