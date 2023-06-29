const mongoose = require("mongoose")

// Creating a new user schema using mongoose.Schema
const UserSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)


module.exports = mongoose.model("User", UserSchema)
