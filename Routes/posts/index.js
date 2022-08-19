const explorePagenation = require("./get/explore");
const getPagenation = require("./get/get-all");
const getById = require("./get/get-by-id");
const del = require("./post/del");
const add = require("./post/new");

const postsConroller = {
  explorePagenation,
  getPagenation,
  getById,
  del,
  add,
};

module.exports = postsConroller;
