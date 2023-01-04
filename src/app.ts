import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "./.env") });
import morgan from "morgan";
import Database from "./database";
import { IUser } from "./schemas/userSchema";
import session from "express-session";
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

import loginRouter from "./routes/loginRoutes";
import registerRouter from "./routes/registerRoutes";
import { requireLogin } from "./middlewares/requireLogin";
import { ApiRouter } from "./routes/api";
import postRoutes from "./routes/postRoutes";
declare module "express" {
  export interface Request {
    session: {
      user: IUser;
    };
  }
}

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

new Database();

app.use(
  session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false,
  })
);

// add user to express

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "../public")));

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/api", ApiRouter);

app.get("/", requireLogin, (req: any, res, next) => {
  var payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };

  res.status(200).render("home", payload);
});
app.use("/posts/:id", requireLogin, postRoutes);

export { app };
