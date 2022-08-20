const Users = require("../../../schema/User");

const userData = async (req, res) => {
  const user = await Users.findOne(
    req.query,
    "username name email bio avatar isVerified"
  );

  if (!user?.username) {
    return res.status(200).send({ code: 400, msg: "user not Found" });
  }

  return res.status(200).send({ code: 200, user });
};

module.exports = userData;
