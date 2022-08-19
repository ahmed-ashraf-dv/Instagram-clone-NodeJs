const Post = require("../../../schema/Post");
const uploadImg = require("../../../utils/uploadImg");
const generateToken = require("../../../utils/generateToken");

const imgKey = "img";

const add = async (req, res) => {
  const imgName = `imgs/posts/${generateToken(25)}`;

  uploadImg({ req, res, imgKey, imgName }, async ({ err, file }) => {
    if (err)
      return res.status(200).send({ code: 400, msg: "something wrong !" });

    if (!file || !Object.keys(file).length)
      return res.status(200).send({ code: 400, msg: "something wrong !" });

    const path = `/${file.filename}`;
    const { user_id, caption } = req.body;

    try {
      const post = await new Post({ user_id, img: path, caption }).save();

      if (post) return res.status(200).send({ code: 200, post });

      res.status(200).send({ msg: "You do not have permission", code: 400 });
    } catch (err) {
      res.status(200).send({ msg: err.message, code: 400 });
    }
  });
};

module.exports = add;
