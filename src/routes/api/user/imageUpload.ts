import { Router } from "express";
import { upload } from "../../../middlewares/multerUploader";
import User from "../../../schemas/userSchema";

const router = Router();

router.post(
  "/upload",
  upload.single("filePhoto"),
  async (req: any, res, next) => {
    console.log(req.file);
    const user = await User.findByIdAndUpdate(req.session.user, {
      profilePic: req.file.filename,
    });
    res.status(200).json({
      status: "ok",
      data: user,
    });
  }
);

export { router as uploadImageRouter };
