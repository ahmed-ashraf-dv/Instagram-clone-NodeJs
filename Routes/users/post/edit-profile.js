const User = require("../../../schema/User");
const imgFilter = require("../../../utils/imgFilter");

const UpdateProfile = async (req, res) => {
  const { token, username, name, password, email, bio, avatar } = req.body;

  if (!token) {
    return res.status(200).send({ code: 400, msg: "token required" });
  }

  const currentUser = await User.findOne({ token }, "_id");

  if (!currentUser?._id) {
    return res
      .status(200)
      .send({ code: 400, message: "this user is not exist" });
  }

  let userData = { username, name, password, email, bio, avatar };

  // Check if username is available
  if (username) {
    const usernameIsExist = await User.find({ username }).count();

    if (usernameIsExist) {
      return res
        .status(200)
        .send({ code: 400, message: "username not available" });
    }
  }

  if (avatar) {
    if (!imgFilter(avatar).isValid) {
      return res.status(200).send({ msg: imgFilter(img).msg, code: 400 });
    }
  }

  const user = await User.updateOne({ token }, userData);

  if (!user) {
    return res.status(200).send({ code: 400, msg: "unknown error" });
  }

  res.status(200).json({ code: 200 });
};

module.exports = UpdateProfile;
