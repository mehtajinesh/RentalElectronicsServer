import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userID: String,
    productID: String,
    productCount: Number,
}, {collection: 'cart'});
export default cartSchema;