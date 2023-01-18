import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "./.env") });
import cors from "cors";
import morgan from "morgan";
import Database from "./database";
import session from "express-session";
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(cors());

import loginRouter from "./routes/loginRoutes";
import registerRouter from "./routes/registerRoutes";
import { requireLogin } from "./middlewares/requireLogin";
import { ApiRouter } from "./routes/api";
import postRoutes from "./routes/postRoutes";
import { profileRoutes } from "./routes/profileRoutes";
import { logoutRoutes } from "./routes/logoutRoutes";
import { HomeRoutes } from "./routes/homeRoutes";
import { searchRoutes } from "./routes/searchRoutes";
import { messageRouter } from "./routes/messageRoutes";
import { IUser } from "./schemas/userSchema";
import { notificationRouter } from "./routes/notificationRoutes";
import { notFoundRoutes } from "./routes/404";

new Database();

app.use(
  session({
    secret: process.env.sessionSecret || "mysecret",
    resave: true,
    saveUninitialized: false,
  })
);

// add user to express

declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}

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
app.use("/404", notFoundRoutes);
app.use("/api", ApiRouter);
app.use("/profile", requireLogin, profileRoutes);
app.use("/search", requireLogin, searchRoutes);
app.use("/logout", requireLogin, logoutRoutes);
app.use("/messages", requireLogin, messageRouter);
app.use("/notifications", requireLogin, notificationRouter);

app.use("/", requireLogin, HomeRoutes);
app.use("/posts/:id", requireLogin, postRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.redirect("/404");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.redirect("/404");
});

export { app };
