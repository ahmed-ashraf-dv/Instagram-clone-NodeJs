const mongoose = require("mongoose");
const db = mongoose.connection.useDb("Instagram-clone");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, default: "No Bio" },
    avatar: { type: String, required: true },
    isVerified: { type: Boolean, required: false },
  },
  { timestamps: true }
);

const User = db.model("User", UserSchema, "users");

module.exports = User;
