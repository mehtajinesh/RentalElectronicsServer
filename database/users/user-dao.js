import userModel from "./user-model.js";

export const daoCreateUser = (user) => userModel.create(user);
export const daoFindUserRoleGivenID = (userID) => userModel.findOne({_id: userID}).populate("userRoleID");
export const daoFindUserByEmail = (email) => userModel.findOne({email: email});
export const daoFindUserByCredentials = (email, password) => userModel.findOne({email: email, password: password});
export const daoUpdateUser = (userID, user) => userModel.updateOne({_id: userID}, {$set: user});
export const daoDeleteUser = (userID) => userModel.deleteOne({_id: userID});


