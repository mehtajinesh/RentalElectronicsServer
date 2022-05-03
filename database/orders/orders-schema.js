import mongoose from 'mongoose';
import productsModel from "../products/products-model.js";

const orderSchema = mongoose.Schema({
    orderDate: {type: String, required: true},
    productID: [{type: mongoose.Schema.Types.ObjectId, ref: 'productsModel', required: true}],
    itemCount: {type: Number, required: true}
}, {collection: 'orders'});
export default orderSchema;