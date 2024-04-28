"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const path_1 = __importDefault(require("path"));
class CustomError extends Error {
    constructor(message, fileName, lineNumber) {
        super(message);
        this.fileName = fileName;
        this.lineNumber = lineNumber;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
const connectMongo = () => {
    if (config_1.DB_STRING) {
        mongoose_1.default.connect(config_1.DB_STRING)
            .then(() => {
            console.log("database is connected");
        })
            .catch(() => {
            throw new CustomError("Error in databse connection Function", path_1.default.basename(__filename), 20);
        });
    }
    else {
        throw new CustomError("string given for database connection is null", path_1.default.basename(__filename), 2);
    }
};
exports.default = connectMongo;
