const Post = require("../../../schema/Post");
const Users = require("../../../schema/User");
const uploadImg = require("../../../utils/uploadImg");
const generateToken = require("../../../utils/generateToken");

const add = async (req, res) => {
  const imgKey = "img";
  const imgName = `imgs/posts/${generateToken(25)}`;

  uploadImg({ req, res, imgKey, imgName }, async ({ err, file }) => {
    if (err)
      return res.status(200).send({ code: 400, msg: "something wrong !" });

    if (!file || !Object.keys(file).length)
      return res.status(200).send({ code: 400, msg: "something wrong !" });

    const path = `/${file.filename}`;
    const { caption, token } = req.body;

    const user = await Users.findOne({ token }, "_id");

    if (!user._id) {
      return res.status(200).send({ code: 400, msg: "something wrong !" });
    }

    try {
      let post = {
        user_id: user._id,
        img: path,
        caption,
      };

      post = await new Post(post).save();

      if (post) return res.status(200).send({ code: 200, post });

      res.status(200).send({ msg: "You do not have permission", code: 400 });
    } catch (err) {
      res.status(200).send({ msg: err.message, code: 400 });
    }
  });
};

module.exports = add;
