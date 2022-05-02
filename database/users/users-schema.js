import mongoose from 'mongoose';
import rolesModel from "../roles/roles-model.js";

const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    roleID: {type: mongoose.Schema.Types.ObjectId, ref: 'rolesModel'},
    sessionToken: String
}, {collection: 'users'});
export default usersSchema;