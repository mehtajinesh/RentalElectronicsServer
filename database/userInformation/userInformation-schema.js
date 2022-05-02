import mongoose from 'mongoose';
import usersModel from "../users/users-model.js";

const userInformationSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
    firstName: String,
    lastName: String,
    bio: String,
    profile_picture: String,
    DOB: String,
    Phone: String
}, {collection: 'user_information'});
export default userInformationSchema;