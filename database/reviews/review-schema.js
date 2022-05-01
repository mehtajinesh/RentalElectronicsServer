import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    reviewDescription: String,
    reviewDate: Date,
    reviewRating: Number
}, {collection: 'reviews'});
export default reviewSchema;