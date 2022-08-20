const { Router } = require("express");
const router = Router();

const usersConroller = require("./users");
const postsConroller = require("./posts");

// get method
router.get("/explore", postsConroller.explorePagenation);
router.get("/getById/:id", postsConroller.getById);
router.get("/getPagenation", postsConroller.getPagenation);

// post method
router.post("/del/:id", postsConroller.del);
router.post("/add", postsConroller.add);

// get method
router.get("/getStaticts/:username", usersConroller.getStaticts);
router.get("/getPosts/:id", usersConroller.getPosts);
router.get("/getFollowers/:username", usersConroller.getFollowers);
router.get("/getFollowing/:username", usersConroller.getFollowing);
router.get("/search-users", usersConroller.search);
router.get("/auth", usersConroller.auth);
router.get("/user-data", usersConroller.userData);

// post method
router.post("/sign-user", usersConroller.sign);
router.post("/login", usersConroller.login);
router.post("/follow", usersConroller.follow);
router.post("/user-data-with-token", usersConroller.userDataWithToken);
router.post("/update", usersConroller.updateAvatar, usersConroller.update);

module.exports = router;
