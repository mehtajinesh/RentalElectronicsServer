import userModel from "./user-model.js";

export const findAllUsers = async () => {
    return await userModel.find();
  }

export const findUserById = async (uid) => {
    return await userModel.findById(uid);
  }

export const findUserByEmail = async (email) => {
    return await userModel.findOne({email: email});
}

export const findUserByCredentials = async (email, password) => {
    return await userModel.findOne({email: email, password: password});
}

export const createUser = async (user) => {
    return await userModel.create(user);
}

export const deleteUser = async (uid) => {
    const user = await userModel.deleteOne({_id: uid});
    return user;
}

export const updateUser = async (uid, user) => {
    const status = await userModel.updateOne({_id: uid}, {$set: user});
    return status;
}


