"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        console.log(process.env.dbUri);
        mongoose_1.default
            .connect(process.env.dbUri)
            .then(() => {
            console.log("database connection successful");
        })
            .catch((err) => {
            console.log("database connection error " + err);
        });
    }
}
exports.default = Database;
