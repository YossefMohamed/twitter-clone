import { Router } from "express";
import { upload } from "../../../middlewares/multerUploader";

const router = Router();

router.post(
  "/upload",
  upload.single("filePhoto"),
  async (req: any, res, next) => {
    console.log(req.body);
    res.send("ok");
  }
);

export { router as uploadImageRouter };
