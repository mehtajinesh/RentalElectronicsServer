import mongoose from 'mongoose';

const productsSchema = mongoose.Schema({
    productName: String,
    productDescription: String,
    categoryID: mongoose.Schema.Types.ObjectId,
    duration: Number,
    location: String,
    postDate: String,
    sellerID: mongoose.Schema.Types.ObjectId,
    price: Number,
    productImages: [],
    totalAvailable: Number,
    totalSold:Number
}, {collection: 'products'});
export default productsSchema;