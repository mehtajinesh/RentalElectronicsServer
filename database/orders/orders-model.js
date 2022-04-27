import mongoose from 'mongoose';
import orderSchema from './orders-schema.js'
const orderModel = mongoose
    .model('orderModel', orderSchema);
export default orderModel;