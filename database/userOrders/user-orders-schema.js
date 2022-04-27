import mongoose from 'mongoose';

const userOrderSchema = mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    orderID: mongoose.Schema.Types.ObjectId,
}, {collection: 'user_orders'});
export default userOrderSchema;