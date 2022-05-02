import mongoose from 'mongoose';
import usersModel from "../users/users-model.js";
import productsModel from "../products/products-model.js";

const cartSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'productsModel'},
    productCount: Number,
}, {collection: 'cart'});
export default cartSchema;