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
router.post(
  "/update",
  (req, res, next) => {
    const uploadImg = require("../utils/uploadImg");
    const generateToken = require("../utils/generateToken");

    const imgName = `imgs/avaters/${generateToken(25)}`;
    const imgKey = "avater";

    uploadImg({ req, res, imgKey, imgName }, async ({ err }) => {
      if (err)
        return res.status(200).send({ code: 400, msg: "something wrong !" });

      next();
    });
  },
  usersConroller.update
);

module.exports = router;
