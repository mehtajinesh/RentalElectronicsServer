"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema to CRUD to represent users.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const user_type_1 = __importDefault(require("../models/user-type"));
const UserSchema = new mongoose_1.default.Schema({
    userType: { type: String, enum: user_type_1.default },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DOB: { type: String, required: true },
    profilePhoto: String,
    phoneNumber: { type: String, required: true },
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
}, { collection: 'users' });
exports.default = UserSchema;
