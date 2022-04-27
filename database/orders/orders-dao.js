import orderModel from './orders-model.js';

export const daoGetAllOrdersForUser = (userID) => orderModel.find({userID:userID});
export const daoAddOrder = (order) => orderModel.create(order);
export const daoDeleteOrderForUser = (userID) => orderModel.deleteOne({userID: userID});
export const daoUpdateOrder = (orderID, updatedOrder) => orderModel.updateOne({orderID: orderID}, {$set: updatedOrder})