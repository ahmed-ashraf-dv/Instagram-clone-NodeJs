const multer = require("multer");
const path = require("path");

const uploadImg = async ({ req, res, imgKey, imgName }, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public"),
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/").at(-1);

      cb(null, `${imgName}.${ext}`);
    },
  });

  const fileFilter = (_, file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;

    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  };

  const multer_data = multer({
    limits: 1024 * 1024 * 4 /* 4MB */,
    storage,
    fileFilter,
  });

  const upload = multer_data.single(imgKey);

  upload(req, res, (err) => {
    if (err) return next({ err });

    return next({ file: req.file });
  });
};

module.exports = uploadImg;
