import { Request, Router } from "express";
import { upload } from "../../../middlewares/multerUploader";
import User, { IUser } from "../../../schemas/userSchema";

const router = Router();

router.post(
  "/upload",
  upload.single("filePhoto"),
  async (req: Request, res, next) => {
    const user =
      req.body.type === "profile"
        ? await User.findByIdAndUpdate(
            req.session.user,
            {
              profilePic: req.file!.filename,
            },
            {
              new: true,
            }
          )
        : await User.findByIdAndUpdate(
            req.session.user,
            {
              coverPic: req.file!.filename,
            },
            {
              new: true,
            }
          );
    req.session.user = user!;
    res.status(200).json({
      status: "ok",
      data: user,
    });
  }
);

export { router as uploadImageRouter };
