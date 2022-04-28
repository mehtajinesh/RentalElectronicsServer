import mongoose from 'mongoose';
import usersModel from "../users/users-model.js";
import categoryModel from "../category/category-model.js";

const productsSchema = mongoose.Schema({
    productName: String,
    productDescription: String,
    categoryID: {type: mongoose.Schema.Types.ObjectId, ref: 'categoryModel'},
    duration: Number,
    location: String,
    postDate: String,
    sellerID: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
    price: Number,
    productImages: [],
    totalAvailable: Number,
    totalSold: Number
}, {collection: 'products'});
export default productsSchema;