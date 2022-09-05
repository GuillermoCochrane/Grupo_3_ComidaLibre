const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/avatar"));
  },
  filename: (req, file, cb) => {
    cb(null, `img_user_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadImg = multer({ storage });

module.exports = uploadImg;
