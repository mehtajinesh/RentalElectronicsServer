import mongoose from 'mongoose';
import userModel from "../users/user-model.js";

const userInformationSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    DOB: {type:String, required:true},
    phoneNumber: {type:Number},
    profilePicture: {
        type: String, default: "https://www.gravatar.com/avatar/?d=identicon",
    },
    address: {
        line1: {type: String, required: true},
        line2: String,
        city: {type: String, required: true},
        state: {type: String, required: true},
        zipcode: {type: String, required: true},
    },
}, {collection: 'user_information'});
export default userInformationSchema;