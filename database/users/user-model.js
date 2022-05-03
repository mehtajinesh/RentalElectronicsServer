import mongoose from "mongoose";
import userSchema from './user-schema.js';

const userModel = mongoose.model("userModel", userSchema);

export default userModel;