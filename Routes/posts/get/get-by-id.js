const Posts = require("../../../schema/Post");
const Users = require("../../../schema/User");
const mongoose = require("mongoose");

const getById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).send({ msg: "Id not valid", code: 400 });
  }

  const postData = await Posts.findOne({ _id: id });

  if (!postData || !postData.user_id) {
    return res.status(200).send({ code: 400, msg: "post not found" });
  }

  const currentUser = await Users.findOne({ _id: postData.user_id });

  const post = {
    caption: postData.caption,
    updatedAt: postData.updatedAt,
    createdAt: postData.createdAt,
    img: postData.img,
    user_id: postData.user_id,
    postId: postData._id,

    user: {
      username: currentUser.username,
      avatar: currentUser.avatar,
    },
  };

  res.status(200).send({ post, code: 200 });
};

module.exports = getById;
