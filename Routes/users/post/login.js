const User = require("../../../schema/User");

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(200)
      .send({ code: 400, msg: "username and password is required" });
  }

  const userToken = await User.findOne({ username, password }, "token");
  const userExist = userToken?.token;

  if (!userExist) {
    return res
      .status(200)
      .send({ code: 400, msg: "username or password is uncorrect" });
  }

  res.status(200).send({ code: 200, token: userToken.token });
};

module.exports = Login;
