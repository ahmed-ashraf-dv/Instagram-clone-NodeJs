const Posts = require("../../../schema/Post");
const User = require("../../../schema/User");
const fs = require("fs");
var ObjectId = require('mongoose').Types.ObjectId;

const del = async (req, res) => {
  const { token } = req.body;
  const _id = req.params.id;
  
  if(!ObjectId.isValid(_id)) return res.status(200).send({code: 400, msg: "id not valid"})

  // get post
  const post = (await Posts.findOne({ _id })) || {};
  const user = (await User.findOne({ token })) || {};

  if (!Object.keys(post).length || !Object.keys(user).length) {
    return res.status(200).send({ msg: "somethin wrong !", code: 400 });
  }

  if (user._id == post.user_id) {
    const postDleted = await Posts.deleteOne({ _id });

console.log(user._id, post.user_id)
console.log(postDleted)

    if (postDleted) {
      fs.unlinkSync(`./public${post?.img}`);

      return res
        .status(200)
        .send({ code: 200, msg: "post deleated successfully" });
    }

    return res.status(200).send({ msg: "somethin wrong !", code: 400 });
  }

  res.status(200).send({ msg: "You do not have permission", code: 400 });
};

module.exports = del;
