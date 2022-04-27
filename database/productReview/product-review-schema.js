import mongoose from 'mongoose';

const productReviewSchema = mongoose.Schema({
    productID: String,
    reviewID: String,
    userID: String
}, {collection: 'product_reviews'});
export default productReviewSchema;