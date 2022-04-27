import cartModel from "./cart-model.js";

export const daoFindCartForUser = (uID) => cartModel.find({userID:uID});
export const daoAddItemToCart = (user) => cartModel.create(user);
export const daoDeleteItemFromCart= (userID) => cartModel.deleteOne({_id: userID});
export const daoUpdateCart = (userID, updatedCart) => cartModel.updateOne({_id: userID}, {$set: updatedUser})