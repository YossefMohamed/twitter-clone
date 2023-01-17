"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./.env") });
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./database"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
exports.app = app;
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "./views"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
const requireLogin_1 = require("./middlewares/requireLogin");
const api_1 = require("./routes/api");
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const profileRoutes_1 = require("./routes/profileRoutes");
const logoutRoutes_1 = require("./routes/logoutRoutes");
const homeRoutes_1 = require("./routes/homeRoutes");
const searchRoutes_1 = require("./routes/searchRoutes");
const messageRoutes_1 = require("./routes/messageRoutes");
const notificationRoutes_1 = require("./routes/notificationRoutes");
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "./views"));
new database_1.default();
app.use((0, express_session_1.default)({
    secret: process.env.sessionSecret || "mysecret",
    resave: true,
    saveUninitialized: false,
}));
// add user to express
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/login", loginRoutes_1.default);
app.use("/register", registerRoutes_1.default);
app.use("/api", api_1.ApiRouter);
app.use("/profile", requireLogin_1.requireLogin, profileRoutes_1.profileRoutes);
app.use("/search", requireLogin_1.requireLogin, searchRoutes_1.searchRoutes);
app.use("/logout", requireLogin_1.requireLogin, logoutRoutes_1.logoutRoutes);
app.use("/messages", requireLogin_1.requireLogin, messageRoutes_1.messageRouter);
app.use("/notifications", requireLogin_1.requireLogin, notificationRoutes_1.notificationRouter);
app.get("/", requireLogin_1.requireLogin, homeRoutes_1.HomeRoutes);
app.use("/posts/:id", requireLogin_1.requireLogin, postRoutes_1.default);
