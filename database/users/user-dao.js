import userModel from "./user-model.js";

export const createUser = (user) => userModel.create(user);
export const findAllUsers = () => userModel.find();
export const findUserById = (userID) => userModel.findById(userID);
export const findUserByEmail = (email) => userModel.findOne({email: email});
export const findUserByCredentials = (email, password) => userModel.findOne({email: email, password: password});
export const updateUser = (userID, user) => userModel.updateOne({_id: uid}, {$set: user});
export const deleteUser = (userID) => userModel.deleteOne({_id: userID});


