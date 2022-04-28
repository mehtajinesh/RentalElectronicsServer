import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    reviewDescription: String, reviewDate: String, reviewRating: Number, reviewLikes: Number, reviewDisLikes: Number
}, {collection: 'reviews'});
export default reviewSchema;