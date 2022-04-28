import productsModel from './products-model.js';

export const daoGetAllTrendingItems = () => productsModel.find({}).sort('-totalSold').limit(10).populate('sellerID');
export const daoGetAllProductsForQuery = (searchWord) => productsModel.find({productName: {$regex: new RegExp(searchWord, 'i')}});
export const daoGetAllProductsForSeller = (userID) => productsModel.find({sellerID: userID});
export const daoGetAllProductsIDsForCategory = (catID) => productsModel.find({categoryID: catID}, '_id').exec();
export const daoGetProductFromID = (productID) => productsModel.findById(productID);
export const daoAddProduct = (product) => productsModel.create(product);
export const daoDeleteProduct = (productID) => productsModel.deleteOne({_id: productID});
export const daoUpdateProduct = (productID, updatedProduct) => productsModel.updateOne({_id: productID}, {$set: updatedProduct})
export const daoUpdateProductAvailableItemsForProduct = (productID, newAvailable) => productsModel.updateOne({_id: productID},{totalSold:newAvailable})