import {daoFindCartForUser, daoUpdateCart} from "../database/cart/cart-dao.js";
import {daoUpdateProductAvailableItemsForProduct} from "../database/products/products-dao.js";
import {daoAddOrder} from "../database/orders/orders-dao.js";
import {daoAddUserOrder} from "../database/userOrders/user-orders-dao.js";

const getCartData = async (req, res) => {
    let cartData = {}
    const isLoggedIn = req.params['loggedIn']
    // check if user loggedin
    if(isLoggedIn)
    {
        // get user id from body
        const userID = req.params['userID']
        // get user cart and send to front end
        cartData = await daoFindCartForUser(userID)
        res.json(cartData);
        return
    }
    res.send(401);
}

const updateCart = async (req, res) => {
    const loggedIn = req.params['loggedIn']
    if (loggedIn){
        const userID = req.params['userID']
        const newCart = req.body;
        await daoUpdateCart(userID,newCart);
        res.send(200);
        return
    }
    res.send(401)
}

const placeOrder = async (req, res) => {
    const isLoggedIn = req.params['loggedIn']
    if (isLoggedIn){
        const userID = req.params['userID']
        // get user cart from database
        const currentCart = await daoFindCartForUser(userID)
        // check if all the items are available in stock
        // if everything is there, then place order and send 200
        // else send error stating which items are out of stock
        const availableItems = []
        const outOfStockItems = []
        for (const item of currentCart){
            //check if item in stock
            if(item["productCount"] <= item["productID"]["totalAvailable"]){
                // item in stock
                availableItems.push({'productID':item["productID"]["_id"],'buyCount':item["productCount"], 'soldCount':item["productID"]["totalSold"]})
            }
            else
            {
                //item out of stock
                outOfStockItems.push({'productID':item["productID"]["_id"]})
            }
        }
        // if all item in stock, place order
        if (outOfStockItems.length === 0){
            const listSoldProductIds = []
            const listSoldProductCounts = []
            for (const item of availableItems){
                // update sold count in the product table
                await daoUpdateProductAvailableItemsForProduct(item['productID'], item['soldCount'] - item['buyCount'])
                // add product and count to list
                listSoldProductIds.push(item['productID'])
                listSoldProductCounts.push(item['buyCount'])
            }
            // add order to order table
            const orderID = await daoAddOrder({'orderDate':(new Date()).toLocaleDateString(),'productID':listSoldProductIds,'itemCount':listSoldProductCounts})
            // add order to user
            await daoAddUserOrder({"userID":userID,"orderID":orderID})
            res.send(200);
            return
        }
        else{
            //send items out of stock
            // TODO: Add error message code
            // res.send(200);
            return
        }
    }
    res.send(401);
}

// const placeOrder = async (req, res) => {
//     const homePageData = {}
//     // fetch available categories
//     const availableCategories = await daoGetAllCategories();
//     //fetch respective filters for these categories
//     //fetch all products for each category
//     //fetch all features for each product and add them as part of each category in which the product belongs
//     const categoriesData = []
//     for (const category of availableCategories) {
//         const features = {}
//         const allProducts = await daoGetAllProductsIDsForCategory(category._id)
//         for(const product of allProducts){
//             const allFeatures = await daoGetAllFeaturesForProduct(product["_id"])
//             for(const feature of allFeatures){
//                 const featureData = await daoGetFeatureForID(feature["featureID"])
//                 const newFeature = {_id:featureData["_id"],featureValue:featureData["FeatureValue"]}
//                 if(featureData['featureName'] in Object.keys(features))
//                 {
//                     features[featureData['FeatureName']] = [ ... features[featureData['FeatureName']],newFeature]
//                 }
//                 else {
//                     features[featureData['FeatureName']] = [newFeature]
//                 }
//             }
//         }
//         const categoryData = {}
//         categoryData[category['categoryName']] = features
//         categoriesData.push(categoryData)
//     }
//     homePageData['categories'] =categoriesData
//     // fetch trending items
//     // go to the products tables and fetch the top 10 products
//     const trendingItems = await daoGetAllTrendingItems();
//     const trendingSellers = []
//     for(const item of trendingItems){
//         const information = {}
//         information[item['_id']] = await daoGetAllUserInformationForUser(item["sellerID"])
//         trendingSellers.push(information)
//     }
//     homePageData['treadingItems'] = trendingItems
//     homePageData['treadingSellersForItems'] = trendingSellers
//     // fetch popular reviews
//     // go to the reviews table and fetch top 10 reviews with max likes
//     const popularReviews = await daoGetPopularReviews();
//     const userWithPopularReviews = []
//     const productWithPopularReviews = []
//     for(const review of popularReviews){
//         const userProduct = await daoGetAllUserProductForReview(review["_id"])
//         const userInformation = await daoGetAllUserInformationForUser(userProduct['userID'])
//         const productInformation = await daoGetProductFromID(userProduct['productID'])
//         userWithPopularReviews.push(userInformation)
//         productWithPopularReviews.push(productInformation)
//     }
//     homePageData['popularReviews'] = popularReviews
//     homePageData['usersWithPopularReviews'] = userWithPopularReviews
//     homePageData['productsWithPopularReviews'] = productWithPopularReviews
//     // if logged in, fetch recently viewed items
//     const isLoggedIn = req.params['loggedIn']
//     if (isLoggedIn)
//     {
//         const recentItems = []
//         // fetch recently viewed items
//         const userID = req.params['userID']
//         // get all recently viewed product ids for this user
//         const productIDs = await daoGetAllRecentlyViewedForUser(userID)
//         for(const productID of productIDs){
//             const productInformation = await daoGetProductFromID(productID['productID'])
//             recentItems.push(productInformation)
//         }
//         homePageData['recentItems'] = recentItems
//     }
//     res.json(homePageData);
// }

export default (app) => {
    app.get('/api/cart', getCartData); //loggedIn and userID needed
    app.post('/api/updateCart', updateCart); // loggedIn and userID - updated Cart in body
    app.post('/api/placeOrder', placeOrder);
}
