import mongoose from 'mongoose';

const userInformationSchema = mongoose.Schema({
    userID: String,
    firstName: String,
    lastName: String,
    bio: String,
    profile_picture: String,
    DOB: String,
    Phone: String
}, {collection: 'user_information'});
export default userInformationSchema;