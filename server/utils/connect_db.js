"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const path_1 = __importDefault(require("path"));
const customError_1 = require("./customError");
const connectMongo = () => {
    if (config_1.DB_STRING) {
        mongoose_1.default.connect(config_1.DB_STRING)
            .then(() => {
            console.log("database is connected");
        })
            .catch(() => {
            throw new customError_1.CustomError("Error in databse connection Function", path_1.default.basename(__filename), 20);
        });
    }
    else {
        throw new customError_1.CustomError("string given for database connection is null", path_1.default.basename(__filename), 2);
    }
};
exports.default = connectMongo;
