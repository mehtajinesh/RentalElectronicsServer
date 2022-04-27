import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    productID: mongoose.Schema.Types.ObjectId
}, {collection: 'wishlist'});
export default wishlistSchema;