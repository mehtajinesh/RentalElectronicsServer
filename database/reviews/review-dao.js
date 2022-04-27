import reviewModel from './review-model.js';

export const daoFindReview = (reviewID) => reviewModel.findById(reviewID);
export const daoAddReview = (review) => reviewModel.create(review);
export const daoDeleteReview = (reviewID) => reviewModel.deleteOne({_id: reviewID});
export const daoUpdateReview = (reviewID, updatedReview) => reviewModel.updateOne({_id: reviewID}, {$set: updatedReview})