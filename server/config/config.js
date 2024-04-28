"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.DB_STRING = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_STRING = process.env.DB_STRING !== undefined ? process.env.DB_STRING : null;
exports.JWT_SECRET = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : null;
