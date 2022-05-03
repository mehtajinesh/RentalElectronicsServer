import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    reviewDescription: {type: String, required: true},
    reviewDate: {type: Date, required: true},
    reviewRating: {type: Number, required: true},
    reviewTitle: {type: String, required: true}
}, {collection: 'reviews'});
export default reviewSchema;