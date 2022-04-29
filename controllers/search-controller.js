import {daoGetAllProductsForQuery} from "../database/products/products-dao.js";
import {
    daoGetAllFeaturesIDsForProduct
} from "../database/productFeatures/product-feature-dao.js";
import {daoGetAllCategoryForProduct} from "../database/productCategory/product-category-dao.js";
import mongoose from "mongoose";

const getSearchResults = async (req, res) => {
    // get searchKey
    const searchKey = req.query['searchKey']
    // get category id
    const categoryID = req.query['categoryID']
    // get featuresFilter list
    const featuresFilterIDsList = req.query['featuresFilterIDsList'].split(',')
    // get search results and send to front end
    const searchResults = await daoGetAllProductsForQuery(searchKey)
    const searchResultsWithFilters = []
    for (const item of searchResults) {
        const productID = item['_id']
        const productFeatures = await daoGetAllFeaturesIDsForProduct(productID)
        const productFeaturesString = productFeatures.map((objectID)=>{ return objectID.toString()})
        const productCategoryIDs = await daoGetAllCategoryForProduct(productID)
        const productCategoriesString = productCategoryIDs.map((objectID)=>{ return objectID.toString()})
        const overlapFeatures = featuresFilterIDsList.filter(value => productFeaturesString.indexOf(value) !== -1)
        if (overlapFeatures.length !== 0 && productCategoriesString.includes(categoryID)) {
            searchResultsWithFilters.push(item)
        }
    }
    res.json(searchResultsWithFilters);
}

export default (app) => {
    app.get('/api/search', getSearchResults); //searchKey, categoryID, featuresFilterIDsList
}
