import mongoose from 'mongoose';
import productsModel from "../products/products-model.js";
import userModel from "../users/user-model.js";

const cartSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required:true},
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'productsModel', required: true},
    productCount: {type:Number, required:true}
}, {collection: 'cart'});
export default cartSchema;