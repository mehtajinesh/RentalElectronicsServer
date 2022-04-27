import categoryModel from './category-model.js';

export const daoGetAllCategories = () => categoryModel.find();
export const daoAddCategory = (category) => categoryModel.create(category);
export const daoDeleteCategory = (catID) => categoryModel.deleteOne({_id: catID});
export const daoUpdateCategory = (catID, updatedCategory) => categoryModel.updateOne({_id: catID}, {$set: updatedCategory})