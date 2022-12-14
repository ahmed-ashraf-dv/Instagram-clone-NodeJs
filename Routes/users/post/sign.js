const User = require("../../../schema/User");
const Follow = require("../../../schema/Follow");
const generateToken = require("../../../utils/generateToken");

const getRandomAvatar = () => {
  const NUM_OF_DEFAULT_AVATARS = 5;

  const avatarName = "default_avatar";
  const randomNum = Math.ceil(Math.random() * NUM_OF_DEFAULT_AVATARS);

  return `/imgs/defaultAvatars/${avatarName + randomNum}.webp`;
};

const Sign = async (req, res) => {
  const { username, name, password, email } = req.body;

  if (!username || !name || !password || !email) {
    return res.status(200).send({ code: 400, msg: "please type all fields" });
  }

  const userExist = await User.findOne({ username }).count();

  if (userExist) {
    return res.status(200).send({ code: 400, msg: "username alredy exist" });
  }

  const userData = {
    username,
    name,
    password,
    token: generateToken(18),
    email,
    bio: "",
    avatar: getRandomAvatar(),
    isVerified: false,
  };

  const user = await new User(userData).save();
  const recordId = user._id.toString();
  const adminIds = await User.find({ isVerified: true }, "_id");

  if (adminIds?.length) {
    const followingData = adminIds.map((admin) => {
      return {
        fromUserId: recordId,
        toUserId: admin._id.toString(),
      };
    });

    await Follow.insertMany(followingData);
  }

  if (user) {
    return res.status(200).send({ code: 200, msg: "user added successfully" });
  }

  res.status(200).send({ code: 400, msg: "unknown error" });
};

module.exports = Sign;
