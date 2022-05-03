import {daoAddFeature, daoGetFeatureForID, daoUpdateFeature} from "../database/features/features-dao.js";
import {daoAddProductFeature, daoGetAllFeaturesIDsForProduct} from "../database/productFeatures/product-feature-dao.js";

export default (app) => {
    app.post('/api/features', addFeature);
    app.post('/api/features/productFeature', addProductFeature);
    app.get('/api/features/fid/:pid', getAllFeaturesIDsForProduct);
    app.get('/api/features/:fid', getFeatureById);
    app.put('/api/features/:fid', updateFeature);
}

const addFeature = async (req, res) => {
    const feature = req.body;
    const insertedFeature = await daoAddFeature(feature);
    res.json(insertedFeature);
}

const addProductFeature = async (req, res) => {
    const productFeature = req.body;
    const response = await daoAddProductFeature(productFeature);
    res.json(response);
}

const getAllFeaturesIDsForProduct = async (req, res) => {
    const productID = req.params['pid'];
    const productData = await daoGetAllFeaturesIDsForProduct(productID)
    res.json(productData);
}

const getFeatureById = async (req, res) => {
    const featuredId = req.params['fid'];
    const featureData = await daoGetFeatureForID(featuredId);
    res.json(featureData);
}

const updateFeature = async (req, res) => {
    const featureId = req.params['fid'];
    const updated_feature = req.body;
    const status = await daoUpdateFeature(featureId, updated_feature);
    res.json(status); 
}