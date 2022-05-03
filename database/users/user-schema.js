import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userRoleID: {type: mongoose.Schema.Types.ObjectId, ref: 'rolesModel', required: true}
}, {collection: 'users'});


export default userSchema;