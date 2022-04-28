import mongoose from 'mongoose';
import usersModel from "../users/users-model.js";
import ordersModel from "../orders/orders-model.js";

const userOrderSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
    orderID: {type: mongoose.Schema.Types.ObjectId, ref: 'ordersModel'}
}, {collection: 'user_orders'});
export default userOrderSchema;