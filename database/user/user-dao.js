const UserModel = require('./user-model');

const findAllUsers = async () => {
    const user = await UserModel.find();
    return user;
  }

const findUserById = async (uid) => {
    const user = await UserModel.findById(uid);
    return user;
  }

const findUserByEmail = async (email) => {
    const user = await UserModel.findOne({email: email});
    return user;
}

const findUserByCredentials = async (email, password) => {
    const user = await UserModel.findOne({email: email, password: password});
    return user;
}

const createUser = async (user) => {
    const status = await UserModel.create(user);
    return status;
}

const deleteUser = async (uid) => {
    const user = await UserModel.deleteOne({_id: uid});
    return user;
}

const updateUser = async (uid, user) => {
    const status = await UserModel.updateOne({_id: uid}, {$set: user});
    return status;
}

module.exports = {
    findAllUsers, findUserByEmail, findUserById, findUserByCredentials, createUser, deleteUser, updateUser
}

