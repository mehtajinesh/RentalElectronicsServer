import {daoGetAllCategories} from "../database/category/category-dao.js";
import {daoGetAllProductsIDsForCategory} from "../database/products/products-dao.js";
import {daoGetAllFeaturesForProduct} from "../database/productFeatures/product-feature-dao.js";
import {daoGetFeatureForID} from "../database/features/features-dao.js";

const getHomePageData = async (req, res) => {
    const homePageData = {}
    // fetch available categories
    const availableCategories = await daoGetAllCategories();
    //fetch respective filters for these categories
    //fetch all products for each category
    //fetch all features for each product and add them as part of each category in which the product belongs
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
        homePageData[category['categoryName']] = features
    }
    // fetch trending items
    // go to each product and
    // fetch popular reviews
    // check if loggedin
    // if yes, fetch recently viewed items
    res.json(homePageData);
}

export default (app) => {
    app.get('/api/home', getHomePageData);
}
