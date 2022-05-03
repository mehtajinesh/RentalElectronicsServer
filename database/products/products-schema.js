import mongoose from 'mongoose';
import userModel from "../users/user-model.js";
import categoryModel from "../category/category-model.js";

const productsSchema = mongoose.Schema({
    productName: {type: String, required: true},
    productDescription: {type: String},
    categoryID: {type: mongoose.Schema.Types.ObjectId, ref: 'categoryModel', required: true},
    duration: {type: Number, required: true},
    location: {type: String, required: true},
    postDate: {type: String, required: true},
    sellerID: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true},
    price: {type: Number, required: true},
    productImages: {type: mongoose.Schema.Types.Array},
    totalAvailable: {type: Number, required: true, defaultValue: 1},
    totalSold: {type: Number, required: true, defaultValue: 0}
}, {collection: 'products'});
export default productsSchema;