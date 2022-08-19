const User = require("../../../schema/User");
const Follows = require("../../../schema/Follow");

const FollowsType = {
  unFollow: "unfollow",
  follow: "follow",
};

const Follow = async (req, res) => {
  const { token, targetUsername, type } = req.body;

  if (!token || !targetUsername || !type) {
    return res.status(200).send({ code: 400, msg: "unknown error" });
  }

  let clientUserId = await User.findOne({ token }, "_id");
  let targetUserId = await User.findOne({ username: targetUsername }, "_id");

  if (!clientUserId?._id || !targetUserId?._id) {
    return res.status(200).send({ code: 400, msg: "unknown error" });
  }

  const followData = {
    fromUserId: clientUserId._id,
    toUserId: targetUserId._id,
  };

  const isUserAlredyFollowed = await Follows.findOne(followData).count();

  if (type === FollowsType.follow) {
    if (isUserAlredyFollowed) {
      return res
        .status(200)
        .send({ code: 400, msg: "your alredy follow this user" });
    }

    const follow = await new Follows(followData).save();

    if (follow) {
      return res
        .status(200)
        .send({ code: 200, msg: "Follow Send successfully" });
    }

    return res.status(200).send({ code: 400, msg: "unknown error" });
  }

  if (!isUserAlredyFollowed) {
    return res
      .status(200)
      .send({ code: 400, msg: "you are not follow this user" });
  }

  const delFollow = await Follows.deleteOne(followData);

  if (delFollow) {
    return res.status(200).send({ code: 200, msg: "unfollow successfully" });
  }

  return res.status(200).send({ code: 400, msg: "unknown error" });
};

module.exports = Follow;
