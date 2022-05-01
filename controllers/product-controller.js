import {daoGetProductFromID} from "../database/products/products-dao.js";
import {
    daoAddItemToCartForUser,
    daoFindCartForUser,
    daoUpdateProductCountCartForUser
} from "../database/cart/cart-dao.js";
import mongoose from "mongoose";
import {
    daoCreateRecentlyViewed,
    daoGetAllRecentlyViewedForUser
} from "../database/recentlyViewed/recently-viewed-dao.js";
import {daoCreateUserWishlist, daoGetWishlistForUser} from "../database/wishlist/wishlist-dao.js";
import {
    daoGetAllFeaturesForProduct,
    daoGetAllFeaturesIDsForProduct
} from "../database/productFeatures/product-feature-dao.js";
import {daoFindReviewForProduct} from "../database/productReview/product-review-dao.js";

const getProductDetails = async (req, res) => {
    // get productID
    const productData = {}
    const productID = req.query['productID']
    productData["productDetails"] = await daoGetProductFromID(mongoose.Types.ObjectId(productID))
    productData["productFeatures"] = await daoGetAllFeaturesForProduct(mongoose.Types.ObjectId(productID))
    productData["productReviews"] = await daoFindReviewForProduct(mongoose.Types.ObjectId(productID))
    res.json(productData);
}

const addProductToCart = async (req, res) => {
    // get loggedIn
    const userID = req.query['userID']
    if(userID){
        // get product id
        const productID = req.query['productID']
        // get product count
        const productCount = req.query['productCount']
        // check if item already in cart
        // if yes then update the count of item in cart
        // if not then add item to cart
        const existingCart = await daoFindCartForUser(userID)
        const cartItems = existingCart.map(item => item["productID"]["_id"].toString())
        if (cartItems.includes(productID))
        {
            await daoUpdateProductCountCartForUser(userID,productID,productCount)
        }
        else{
            await daoAddItemToCartForUser({"userID": mongoose.Types.ObjectId(userID),
                "productID": mongoose.Types.ObjectId(productID),
                "productCount": productCount})
        }
        res.send(200)
        return
    }
    res.send(401)
}

const addProductToRecentlyViewed = async (req, res) => {
    // get loggedIn
    const userID = req.query['userID']
    if(userID){
        // get user id
        // get product id
        const productID = req.query['productID']
        // check if item already in recently viewed
        // if yes then dont do anything
        // if not then add item to recently viewed item
        const existingRecentViews = await daoGetAllRecentlyViewedForUser(userID)
        const recentItems = existingRecentViews.map(item => item["productID"]["_id"].toString())
        if (!recentItems.includes(productID))
        {
            await daoCreateRecentlyViewed({"userID":mongoose.Types.ObjectId(userID),"productID":mongoose.Types.ObjectId(productID)})
            res.send(200)
            return
        }
        else{
            //TODO:send error that item exists
            res.send(200)
            return
        }
    }
    res.send(401)
}

const addProductToWishlist = async (req, res) => {
    // get loggedIn
    const userID = req.query['userID']
    if(userID){
        // get user id
        const userID = req.query['userID']
        // get product id
        const productID = req.query['productID']
        // check if item already in wishlist
        // if yes then dont do anything
        // if not then add item to wishlist
        const existingWishlist = await daoGetWishlistForUser(userID)
        const wishlistItems = existingWishlist.map(item => item["productID"]["_id"].toString())
        if (!wishlistItems.includes(productID))
        {
            await daoCreateUserWishlist({"userID":mongoose.Types.ObjectId(userID),"productID":mongoose.Types.ObjectId(productID)})
            res.send(200)
            return
        }
        else{
            //TODO:send error that item exists
            res.send(200)
            return
        }
    }
    res.send(401)
}

export default (app) => {
    app.post('/api/product', getProductDetails); // productID
    app.post('/api/addProductToCart', addProductToCart); //userID, productID, productCount
    app.post('/api/addProductToRecentlyViewed', addProductToRecentlyViewed); //userID, productID
    app.post('/api/addProductToWishlist', addProductToWishlist);//userID, productID
}
