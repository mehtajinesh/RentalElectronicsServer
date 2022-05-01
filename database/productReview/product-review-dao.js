import productReviewModel from './product-review-model.js';

export const daoFindReviewForUser = (uID) => productReviewModel.find({userID: uID});
export const daoFindReviewForProduct = (pID) => productReviewModel.find({productID: pID}).populate('userID').populate('reviewID');
export const daoGetAllUserProductForReviews = (reviewIDs) => productReviewModel.find({'reviewID': {$in: reviewIDs}}).populate('productID').populate('userID').populate('reviewID');
export const daoAddProductReview = (productReview) => productReviewModel.create(productReview);
export const daoDeleteReviewForProduct = (productID) => productReviewModel.deleteOne({productID: productID});
export const daoDeleteReviewForUser = (userID) => productReviewModel.deleteOne({userID: userID});
export const daoUpdateReviewForProduct = (productID, productReview) => productReviewModel.updateOne({productID: productID}, {$set: productReview})