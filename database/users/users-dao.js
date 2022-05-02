import usersModel from './users-model.js';

export const daoGetAllUsers = () => usersModel.find();
export const daoAddUser = (user) => usersModel.create(user);
export const daoDeleteUser = (userID) => usersModel.deleteOne({_id: userID});
export const daoUpdateUser = (userID, updatedUser) => usersModel.updateOne({_id: userID}, {$set: updatedUser})