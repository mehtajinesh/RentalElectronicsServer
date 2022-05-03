import mongoose from 'mongoose';
import userModel from "../users/user-model.js";
import ordersModel from "../orders/orders-model.js";

const userOrderSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true},
    orderID: {type: mongoose.Schema.Types.ObjectId, ref: 'ordersModel', required: true}
}, {collection: 'user_orders'});
export default userOrderSchema;