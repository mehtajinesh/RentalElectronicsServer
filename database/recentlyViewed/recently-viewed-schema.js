import mongoose from 'mongoose';
import usersModel from "../users/users-model.js";
import productsModel from "../products/products-model.js";

const recentlyViewedSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'productsModel'}
}, {collection: 'recently_viewed'});
export default recentlyViewedSchema;