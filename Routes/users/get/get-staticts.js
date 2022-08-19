const Users = require("../../../schema/User");
const Posts = require("../../../schema/Post");
const Follow = require("../../../schema/Follow");

const getStaticts = async (req, res) => {
  const { username } = req.params;
  const { clientToken } = req.query;
  let user_id;

  const user = await Users.findOne({ username }, "_id");

  if (!user?._id) {
    return res.status(200).send({ code: 400, msg: "user not Found" });
  }

  user_id = user._id;

  let totalPosts = await Posts.find({ user_id }).count();
  let totalFollowers = await Follow.find({ toUserId: user_id }).count();
  let totalFollowing = await Follow.find({ fromUserId: user_id }).count();

  const clientUser = await Users.findOne({ token: clientToken }, "_id");

  if (!clientUser?._id) {
    return res.status(200).send({ code: 400, msg: "user not Found" });
  }

  clientUser_id = clientUser._id;

  let isFollowed = await Follow.find({
    fromUserId: clientUser_id,
    toUserId: user_id,
  }).count();

  res.status(200).send({
    code: 200,
    posts: totalPosts,
    followers: totalFollowers,
    following: totalFollowing,
    isFollowed: isFollowed ? true : false,
  });
};

module.exports = getStaticts;
