import { Router } from "express";
import User from "../../../schemas/userSchema";

const router = Router();
router.get("/", async (req, res, next) => {
  try {
    let searchObj: any = {};
    if (req.query.search !== undefined) {
      searchObj = {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }

    const users = await User.find(searchObj);
    res.status(200).json({
      status: "ok",
      data: users,
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

export { router as getUsersRouter };
