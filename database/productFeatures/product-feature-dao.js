import productFeaturesModel from './product-feature-model.js';

export const daoGetAllFeaturesForProduct = (productID) => productFeaturesModel.find({productID: productID});
export const daoAddProductFeature = (productFeature) => productFeaturesModel.create(productFeature);
export const daoDeleteFeatureForProduct = (productID) => productFeaturesModel.deleteOne({productID: productID});
