const mongoose = require('mongoose');
const userSchema = require('../schema/user-schema');

const userModel = mongoose.model("UserModel", userSchema);

module.exports = userModel;