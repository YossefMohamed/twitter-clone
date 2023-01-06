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
import { profileRoutes } from "./routes/profileRoutes";
import { logoutRoutes } from "./routes/logoutRoutes";
import { HomeRoutes } from "./routes/homeRoutes";
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
app.use("/profile", requireLogin, profileRoutes);
app.use("/logout", requireLogin, logoutRoutes);

app.get("/", requireLogin, HomeRoutes);
app.use("/posts/:id", requireLogin, postRoutes);

export { app };
