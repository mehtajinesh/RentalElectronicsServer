import mongoose from 'mongoose';
import productsModel from "../products/products-model.js";
import reviewsModel from "../reviews/review-model.js";
import userModel from "../users/user-model.js";

const productReviewSchema = mongoose.Schema({
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'productsModel', required: true},
    reviewID: {type: mongoose.Schema.Types.ObjectId, ref: 'reviewsModel', required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true}
}, {collection: 'product_reviews'});
export default productReviewSchema;