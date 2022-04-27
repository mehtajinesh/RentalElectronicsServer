import mongoose from 'mongoose';

const userOrderSchema = mongoose.Schema({
    userID: String,
    orderID: String,
}, {collection: 'user_orders'});
export default userOrderSchema;