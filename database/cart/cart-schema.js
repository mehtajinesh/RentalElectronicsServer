import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    productID: mongoose.Schema.Types.ObjectId,
    productCount: Number,
}, {collection: 'cart'});
export default cartSchema;