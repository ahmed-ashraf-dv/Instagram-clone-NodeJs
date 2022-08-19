const Users = require("../../../schema/User");
const Follow = require("../../../schema/Follow");

const getFollowers = async (req, res) => {
  const { username } = req.params;
  const { page = 1, amount = 10 } = req.query;

  let user_id;

  const user = await Users.findOne({ username }, "_id");

  if (!user?._id) {
    return res.status(200).send({ code: 400, msg: "user not Found" });
  }

  user_id = user._id;

  const followersData = await Follow.find({ fromUserId: user_id })
    .sort({ createdAt: -1 })
    .limit(amount)
    .skip((page - 1) * amount);

  let total = await Follow.find({ fromUserId: user_id }).count();
  total = Math.ceil(total / amount);

  const UsersData = await Users.find(
    {
      _id: {
        $in: followersData.map((follow) => follow.toUserId),
      },
    },
    "username _id name email bio avatar"
  );

  const followers = followersData.map((follow) => {
    const currentUser = UsersData.find((user) => user._id == follow.toUserId);

    return {
      username: currentUser?.username,
      avatar: currentUser?.avatar,
      bio: currentUser?.bio,
    };
  });

  return res.status(200).send({ code: 200, followers, total });
};

module.exports = getFollowers;
