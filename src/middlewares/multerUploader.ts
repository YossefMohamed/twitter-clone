import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images",
    filename: function (req, file, cb) {
      cb(null, req.session.user._id + "." + "png");
    },
  }),
});
