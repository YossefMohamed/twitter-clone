import { Router } from "express";
import User from "../schemas/useSchema";
import bcrypt from "bcrypt";
const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", async (req: any, res, next) => {
  const payload = req.body;

  if (req.body.logUsername && req.body.logPassword) {
    const user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { email: req.body.logUsername },
      ],
    }).catch((error: Error) => {
      console.log(error);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("login", payload);
    });

    if (user != null) {
      const result = await bcrypt.compare(req.body.logPassword, user.password);

      if (result === true) {
        req.session.user = user;
        return res.redirect("/");
      }
    }

    payload.errorMessage = "Login credentials incorrect.";
    return res.status(200).render("login", payload);
  }

  payload.errorMessage = "Make sure each field has a valid value.";
  res.status(200).render("login");
});

export default router;
