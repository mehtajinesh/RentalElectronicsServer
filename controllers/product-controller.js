import {
    daoGetProductFromID, 
    daoAddProduct,
    daoFindAllItems
} from "../database/products/products-dao.js";
import {
    daoAddItemToCartForUser,
    daoFindCartForUser,
    daoUpdateProductCountCartForUser,
} from "../database/cart/cart-dao.js";
import mongoose from "mongoose";
import {
    daoCreateRecentlyViewed,
    daoGetAllRecentlyViewedForUser
} from "../database/recentlyViewed/recently-viewed-dao.js";
import {daoCreateUserWishlist, daoGetWishlistForUser} from "../database/wishlist/wishlist-dao.js";

const getProductDetails = async (req, res) => {
    // get productID
    const productID = req.params['pid'];
    // const productID = req.query['productID']
    const productData = await daoGetProductFromID(productID)
    res.json(productData);
}

const addProductToCart = async (req, res) => {
    // get loggedIn
    const isLoggedIn = req.query['loggedIn']
    if(isLoggedIn){
        // get user id
        const userID = req.query['userID']
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
    const isLoggedIn = req.query['loggedIn']
    if(isLoggedIn){
        // get user id
        const userID = req.query['userID']
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
    const isLoggedIn = req.query['loggedIn']
    if(isLoggedIn){
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

const addProduct = async (req, res) => {
    const product = req.body;
    const insertedProduct = await daoAddProduct(product);
    res.json(insertedProduct);
}

// only for testing to see if products are added
const findAllProducts = async (req, res) => {
    const listedItems = await daoFindAllItems();
    res.json(listedItems);
}

export default (app) => {
    app.get('/api/product/:pid', getProductDetails); // productID
    app.post('/api/addProductToCart', addProductToCart); //loggedIn, userID, productID, productCount
    app.post('/api/addProductToRecentlyViewed', addProductToRecentlyViewed); //loggedIn, userID, productID
    app.post('/api/addProductToWishlist', addProductToWishlist);//loggedIn, userID, productID

    app.post('/api/product/:uid', addProduct);
    app.get('/api/products/listedItems', findAllProducts);
}
