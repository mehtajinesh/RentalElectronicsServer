import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    roleID: String,
    sessionToken: String
}, {collection: 'users'});
export default usersSchema;