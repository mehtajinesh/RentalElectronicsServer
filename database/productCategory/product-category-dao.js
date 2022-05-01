import productCategoryModel from './product-category-model.js';

export const daoGetAllProductsForCategory = (catID) => productCategoryModel.find({categoryID: catID}).populate('productID');
export const daoGetAllCategoryForProduct = (productID) => productCategoryModel.find({productID: productID}).distinct('categoryID');
export const daoAddProductCategory = (productCategory) => productCategoryModel.create(productCategory);
export const daoDeleteAllCategoryForProduct = (productID) => productCategoryModel.deleteOne({productID: productID});
