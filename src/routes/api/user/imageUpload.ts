import { Router } from "express";
import { upload } from "../../../middlewares/multerUploader";
import User, { IUser } from "../../../schemas/userSchema";

const router = Router();

router.post(
  "/upload",
  upload.single("filePhoto"),
  async (req: any, res, next) => {
    console.log(req.body);
    const user =
      req.body.type === "profile"
        ? await User.findByIdAndUpdate(req.session.user, {
            profilePic: req.file.filename,
          })
        : await User.findByIdAndUpdate(req.session.user, {
            coverPic: req.file.filename,
          });

    res.status(200).json({
      status: "ok",
      data: user,
    });
  }
);

export { router as uploadImageRouter };
