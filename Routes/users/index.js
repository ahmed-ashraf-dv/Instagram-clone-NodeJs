const getFollowers = require("./get/get-followers");
const getFollowing = require("./get/get-following");
const getPosts = require("./get/get-posts");
const getStaticts = require("./get/get-staticts");
const search = require("./get/search-users");
const auth = require("./get/auth");
const userData = require("./get/user-data");
const userDataWithToken = require("./get/user-data-with-token");

const sign = require("./post/sign");
const login = require("./post/login");
const follow = require("./post/send-follow");
const update = require("./post/edit-profile");

const usersConroller = {
  getPosts,
  getStaticts,
  getFollowers,
  getFollowing,
  search,
  auth,
  userData,

  update,
  login,
  sign,
  follow,
  userDataWithToken,
};

module.exports = usersConroller;
