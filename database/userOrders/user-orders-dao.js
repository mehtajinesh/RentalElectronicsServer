import userOrderModel from './user-orders-model.js';

export const daoGetAllOrdersForUser = (userID) => userOrderModel.find({userID: userID}).populate("orderID").populate("productID");
export const daoAddUserOrder = (userOrder) => userOrderModel.create(userOrder);
export const daoDeleteAllOrderForUser = (userID) => userOrderModel.deleteMany({userID: userID});