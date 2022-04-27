import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema({
    userID: String,
    productID: String
}, {collection: 'wishlist'});
export default wishlistSchema;