import mongoose from 'mongoose';
import orderSchema from './orders-schema.js'

const ordersModel = mongooses.model('ordersModel', orderSchema);
export default ordersModel;