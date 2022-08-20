const Users = require("../../../schema/User");

const searchUsers = async (req, res) => {
  const { query, page = 1, amount = 10 } = req.query;

  if (!query) {
    return res.status(200).send({ code: 400, msg: "type query !" });
  }

  let result = await Users.find(
    {},
    "_id username name email bio avatar isVerified"
  )
    .sort({ createdAt: -1 })
    .limit(amount)
    .skip((page - 1) * amount);

  result = result.filter((res) => res.username.includes(query));

  res.status(200).send({ code: 200, result });
};

module.exports = searchUsers;
