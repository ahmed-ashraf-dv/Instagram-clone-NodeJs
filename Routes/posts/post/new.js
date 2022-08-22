const Post = require("../../../schema/Post");
const Users = require("../../../schema/User");
const imgFilter = require("../../../utils/imgFilter");

const add = async (req, res) => {
  const { caption, token, img } = req.body;

  if (!token || !img) {
    return res.status(200).send({ msg: "unknown error", code: 400 });
  }

  const user = await Users.findOne({ token }, "_id");

  if (!user._id) {
    return res.status(200).send({ code: 400, msg: "something wrong !" });
  }

  if (!imgFilter(img).isValid) {
    return res.status(200).send({ msg: imgFilter(img).msg, code: 400 });
  }

  try {
    let post = {
      user_id: user._id,
      img,
      caption,
    };

    post = await new Post(post).save();

    if (post) return res.status(200).send({ code: 200, post });

    res.status(200).send({ msg: "You do not have permission", code: 400 });
  } catch (err) {
    res.status(200).send({ msg: err.message, code: 400 });
  }
};

module.exports = add;
