const mongoose = require("mongoose");
const db = mongoose.connection.useDb("Instagram-clone");

const FollowSchema = new mongoose.Schema(
  {
    fromUserId: { type: String, required: true },
    toUserId: { type: String, required: true },
  },
  { timestamps: true }
);

const Follow = db.model("Follow", FollowSchema, "follow");

module.exports = Follow;
