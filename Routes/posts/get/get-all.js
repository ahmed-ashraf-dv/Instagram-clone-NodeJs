const Posts = require("../../../schema/Post");
const Users = require("../../../schema/User");

const getAll = async (req, res) => {
  const { page = 1, amount = 10 } = req.query;

  let posts = await Posts.find()
    .sort({ createdAt: -1 })
    .limit(amount)
    .skip((page - 1) * amount);

  let total = await Posts.count();
  total = Math.ceil(total / amount);

  if (!posts.at(-1)?.img) {
    return res.status(200).send({ total, posts: [] });
  }

  const UsersData = await Users.find(
    {
      _id: {
        $in: posts.map((post) => post.user_id),
      },
    },
    "username _id name email bio avatar"
  );

  posts = posts.map((post) => {
    const currentUser = UsersData.find((user) => user._id == post.user_id);

    return {
      caption: post.caption,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
      img: post.img,
      user_id: post.user_id,
      postId: post._id,

      user: {
        username: currentUser?.username,
        avatar: currentUser?.avatar,
      },
    };
  });

  res.status(200).send({ total, posts, code: 200 });
};

module.exports = getAll;
