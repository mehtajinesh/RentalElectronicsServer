import {daoGetAllCategories} from "../database/category/category-dao.js";
import {
    daoGetAllProductsIDsForCategory,
    daoGetAllTrendingItems,
    daoGetProductFromID
} from "../database/products/products-dao.js";
import {daoGetAllFeaturesForProduct} from "../database/productFeatures/product-feature-dao.js";
import {daoGetFeatureForID} from "../database/features/features-dao.js";
import {daoGetAllUserInformationForUser} from "../database/userInformation/userInformation-dao.js";
import {daoGetPopularReviews} from "../database/reviews/review-dao.js";
import {daoGetAllUserProductForReview} from "../database/productReview/product-review-dao.js";
import {daoGetAllRecentlyViewedForUser} from "../database/recentlyViewed/recently-viewed-dao.js";

const getHomePageData = async (req, res) => {
    const homePageData = {}
    // fetch available categories
    const availableCategories = await daoGetAllCategories();
    //fetch respective filters for these categories
    //fetch all products for each category
    //fetch all features for each product and add them as part of each category in which the product belongs
    const categoriesData = []
    for (const category of availableCategories) {
        const features = {}
        const allProducts = await daoGetAllProductsIDsForCategory(category._id)
        for(const product of allProducts){
            const allFeatures = await daoGetAllFeaturesForProduct(product["_id"])
            for(const feature of allFeatures){
                const featureData = await daoGetFeatureForID(feature["featureID"])
                const newFeature = {_id:featureData["_id"],featureValue:featureData["FeatureValue"]}
                if(featureData['featureName'] in Object.keys(features))
                {
                    features[featureData['FeatureName']] = [ ... features[featureData['FeatureName']],newFeature]
                }
                else {
                    features[featureData['FeatureName']] = [newFeature]
                }
            }
        }
        const categoryData = {}
        categoryData[category['categoryName']] = features
        categoriesData.push(categoryData)
    }
    homePageData['categories'] =categoriesData
    // fetch trending items
    // go to the products tables and fetch the top 10 products
    const trendingItems = await daoGetAllTrendingItems();
    const trendingSellers = []
    for(const item of trendingItems){
        const information = {}
        information[item['_id']] = await daoGetAllUserInformationForUser(item["sellerID"])
        trendingSellers.push(information)
    }
    homePageData['treadingItems'] = trendingItems
    homePageData['treadingSellersForItems'] = trendingSellers
    // fetch popular reviews
    // go to the reviews table and fetch top 10 reviews with max likes
    const popularReviews = await daoGetPopularReviews();
    const userWithPopularReviews = []
    const productWithPopularReviews = []
    for(const review of popularReviews){
        const userProduct = await daoGetAllUserProductForReview(review["_id"])
        const userInformation = await daoGetAllUserInformationForUser(userProduct['userID'])
        const productInformation = await daoGetProductFromID(userProduct['productID'])
        userWithPopularReviews.push(userInformation)
        productWithPopularReviews.push(productInformation)
    }
    homePageData['popularReviews'] = popularReviews
    homePageData['usersWithPopularReviews'] = userWithPopularReviews
    homePageData['productsWithPopularReviews'] = productWithPopularReviews
    // if logged in, fetch recently viewed items
    const isLoggedIn = req.params['loggedIn']
    if (isLoggedIn)
    {
        const recentItems = []
        // fetch recently viewed items
        const userID = req.params['userID']
        // get all recently viewed product ids for this user
        const productIDs = await daoGetAllRecentlyViewedForUser(userID)
        for(const productID of productIDs){
            const productInformation = await daoGetProductFromID(productID['productID'])
            recentItems.push(productInformation)
        }
        homePageData['recentItems'] = recentItems
    }
    res.json(homePageData);
}

export default (app) => {
    app.get('/api/home', getHomePageData);
}