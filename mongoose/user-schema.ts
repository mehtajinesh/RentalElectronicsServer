/**
 * @file Implements mongoose schema to CRUD to represent users.
 */
import mongoose from "mongoose";
import User from "../models/user";
import UserType from "../models/user-type";

const UserSchema = new mongoose.Schema<User>({
  userType: {type: String, enum: UserType},
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  DOB: {type: String, required: true},
  profilePhoto: String,
  phoneNumber: {type: String, required: true},
  address1: {type: String, required: true},
  address2: String,
  city: {type: String, required: true},
  state: {type: String, required: true},
  zipCode: {type: String, required: true}
}, {collection: 'users'});

export default UserSchema;
