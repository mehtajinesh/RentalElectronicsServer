import mongoose from 'mongoose';

const productsSchema = mongoose.Schema({
    productName: String,
    productDescription: String,
    categoryID: String,
    duration: Number,
    location: String,
    postDate: String,
    sellerID: String,
    price: Number,
    productImages: [],
    totalAvailable: Number,
    totalSold:Number
}, {collection: 'products'});
export default productsSchema;