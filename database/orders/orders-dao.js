import ordersModel from './orders-model.js';

export const daoAddOrder = (order) => ordersModel.create(order);
export const daoDeleteOrder = (orderID) => ordersModel.deleteOne({orderID: orderID});
export const daoUpdateOrder = (orderID, updatedOrder) => ordersModel.updateOne({orderID: orderID}, {$set: updatedOrder})