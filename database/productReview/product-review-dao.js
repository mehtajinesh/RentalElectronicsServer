import productReviewModel from './product-review-model.js';

export const daoAddProductReview = (userID, productID, reviewID) => productReviewModel.create({
    userID: userID, productID: productID, reviewID: reviewID
});
export const daoFindReviewForProduct = (productID) => productReviewModel.find({productID: productID}).populate('userID').populate('reviewID');
export const daoGetAllUserProductForReviews = (reviewIDs) => productReviewModel.find({'reviewID': {$in: reviewIDs}}).populate('productID').populate('userID').populate('reviewID');
export const daoFindReviewForUser = (userID) => productReviewModel.find({userID: userID}).populate("productID").populate("sellerID").populate("reviewID");
export const daoDeleteReviewForProduct = (productID) => productReviewModel.deleteOne({productID: productID});
export const daoDeleteReviewForUser = (userID) => productReviewModel.deleteOne({userID: userID});
export const daoUpdateReviewForProduct = (productID, productReview) => productReviewModel.updateOne({productID: productID}, {$set: productReview})



