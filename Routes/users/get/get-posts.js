const Users = require("../../../schema/User");
const Posts = require("../../../schema/Post");

const getPosts = async (req, res) => {
  const { page = 1, amount = 10 } = req.query;
  const { id } = req.params;

  const user = await Users.findOne(
    { _id: id },
    "_id username avatar isVerified"
  );

  if (!user?._id) {
    return res.status(200).send({ code: 400, msg: "user not Found" });
  }

  user_id = user._id;

  let posts = await Posts.find({ user_id })
    .sort({ createdAt: -1 })
    .limit(amount)
    .skip((page - 1) * amount);

  let total = await Posts.find({ user_id }).count();
  total = Math.ceil(total / amount);

  posts = posts.map((post) => {
    return {
      caption: post.caption,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
      img: post.img,
      user_id: post.user_id,
      postId: post._id,

      user: {
        username: user.username,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    };
  });

  res.status(200).send({ code: 200, total, posts });
};

module.exports = getPosts;
