import userOrderModel from './user-orders-model.js';

export const daoGetAllOrdersForUser = (userID) => userOrderModel.find({userID:userID});
export const daoAddUserOrder = (userOrder) => userOrderModel.create(userOrder);
export const daoDeleteAllOrderForUser = (userID) => userOrderModel.deleteMany({userID: userID});