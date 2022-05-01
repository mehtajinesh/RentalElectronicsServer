import productFeaturesModel from './product-feature-model.js';

export const daoGetAllFeaturesIDsForProduct = (productID) => productFeaturesModel.find({productID: productID}).distinct('featureID');
export const daoAddProductFeature = (productFeature) => productFeaturesModel.create(productFeature);
export const daoDeleteFeatureForProduct = (productID) => productFeaturesModel.deleteOne({productID: productID});
export const daoGetAllFeaturesIDsForListOfProducts = (listOfProducts) => productFeaturesModel.find({productID: {$in: listOfProducts}}).distinct('featureID');
