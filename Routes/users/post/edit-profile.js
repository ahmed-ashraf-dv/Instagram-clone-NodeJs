const User = require("../../../schema/User");
const fs = require("fs");

const UpdateProfile = async (req, res) => {
  const { token, username, name, password, email, bio } = req.body;
  const file = req.file;

  if (!token) {
    if (file?.filename) fs.unlinkSync(`./public/${file?.filename}`);

    return res.status(200).send({ code: 400, msg: "token required" });
  }

  const currentUser = await User.findOne({ token }, "avatar");

  if (!currentUser?.avatar) {
    if (file?.filename) fs.unlinkSync(`./public/${file?.filename}`);

    return res
      .status(200)
      .send({ code: 400, message: "this user is not exist" });
  }

  let userData = { username, name, password, email, bio };

  // Check if username is available
  if (username) {
    const usernameIsExist = await User.find({ username }).count();

    if (usernameIsExist) {
      if (file?.filename) fs.unlinkSync(`./public/${file?.filename}`);

      return res
        .status(200)
        .send({ code: 400, message: "username not available" });
    }
  }

  if (file) {
    const path = `/${file?.filename}`;
    userData.avatar = path;

    fs.unlinkSync(`./public${currentUser?.avatar}`);
  }

  const user = await User.updateOne({ token }, userData);

  if (!user) {
    return res.status(200).send({ code: 400, msg: "unknown error" });
  }

  res.status(200).json({ code: 200 });
};

module.exports = UpdateProfile;
