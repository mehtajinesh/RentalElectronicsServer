import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    orderID: String,
    orderDate: String,
    productID: String,
    itemCount: Number
}, {collection: 'orders'});
export default orderSchema;