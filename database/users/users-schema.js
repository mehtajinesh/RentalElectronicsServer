import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    roleID: mongoose.Schema.Types.ObjectId,
    sessionToken: String
}, {collection: 'users'});
export default usersSchema;