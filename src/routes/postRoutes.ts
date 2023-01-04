import { Router } from "express";
const router = Router({ mergeParams: true });

router.get("/", (req: any, res, next) => {
  console.log(req.params.id);

  var payload = {
    pageTitle: "Tweet",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    postId: req.params.id,
  };
  res.status(200).render("post", payload);
});

export default router;
