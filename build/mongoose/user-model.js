"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD documents in the users collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = __importDefault(require("./user-schema"));
const UserModel = mongoose_1.default.model('UserModel', user_schema_1.default);
exports.default = UserModel;
