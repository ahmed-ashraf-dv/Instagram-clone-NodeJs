const mongoose = require("mongoose");
const db = mongoose.connection.useDb("Instagram-clone");

const PostSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    img: { type: String, required: true },
    caption: { type: String },
  },
  { timestamps: true }
);

const Post = db.model("Post", PostSchema, "posts");

module.exports = Post;
