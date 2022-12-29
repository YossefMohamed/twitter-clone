import express from "express";
import User from "../schemas/useSchema";
import bcrypt from "bcrypt";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", async (req: any, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const payload = req.body;

  if (firstName && lastName && username && email && password) {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((error: Error) => {
      console.log(error);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("register", payload);
    });

    if (user == null) {
      // No user found
      const data = req.body;
      data.password = await bcrypt.hash(password, 10);

      User.create(data).then((user) => {
        req.session.user = user;
        return res.redirect("/");
      });
    } else {
      // User found
      if (email == user.email) {
        payload.errorMessage = "Email already in use.";
      } else {
        payload.errorMessage = "Username already in use.";
      }
      res.status(200).render("register", payload);
    }
  } else {
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("register", payload);
  }
});

export default router;
