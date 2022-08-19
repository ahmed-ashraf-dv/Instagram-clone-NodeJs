const Users = require("../../../schema/User");
const Follow = require("../../../schema/Follow");

const getAuth = async (req, res) => {
  const { token } = req.query;

  const user = await Users.findOne({ token }, "token");

  if (!user?.token) {
    return res.status(200).send({ code: 400, msg: "user not Found" });
  }

  return res.status(200).send({ code: 200, token: user?.token });
};

module.exports = getAuth;
