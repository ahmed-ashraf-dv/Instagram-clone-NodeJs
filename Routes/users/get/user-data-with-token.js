const Users = require("../../../schema/User");

const userDataWithToken = async (req, res) => {
  const user = await Users.findOne(
    { token: req.query.token },
    "_id username name token email bio avatar createdAt updatedAt isVerified"
  );

  if (!user?.token) {
    return res.status(200).send({ code: 400, msg: "user not Found" });
  }

  return res.status(200).send({ code: 200, user });
};

module.exports = userDataWithToken;
