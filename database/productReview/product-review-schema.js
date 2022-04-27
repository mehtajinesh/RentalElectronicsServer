import mongoose from 'mongoose';

const productReviewSchema = mongoose.Schema({
    productID: mongoose.Schema.Types.ObjectId,
    reviewID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId
}, {collection: 'product_reviews'});
export default productReviewSchema;