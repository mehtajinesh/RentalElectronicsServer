import mongoose from 'mongoose';
import userModel from "../users/user-model.js";
import productsModel from "../products/products-model.js";

const wishlistSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true},
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'productsModel', required: true}
}, {collection: 'wishlist'});
export default wishlistSchema;