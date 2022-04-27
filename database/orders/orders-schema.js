import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    orderID: mongoose.Schema.Types.ObjectId,
    orderDate: String,
    productID: mongoose.Schema.Types.ObjectId,
    itemCount: Number
}, {collection: 'orders'});
export default orderSchema;