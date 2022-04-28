import reviewModel from './review-model.js';

export const daoFindReview = (reviewID) => reviewModel.findById(reviewID);
export const daoGetPopularReviews = () => reviewModel.find().sort('-reviewLikes').limit(10)
export const daoAddReview = (review) => reviewModel.create(review);
export const daoDeleteReview = (reviewID) => reviewModel.deleteOne({_id: reviewID});
export const daoUpdateReview = (reviewID, updatedReview) => reviewModel.updateOne({_id: reviewID}, {$set: updatedReview})