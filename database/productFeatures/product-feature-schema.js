import mongoose from 'mongoose';

const productFeaturesSchema = mongoose.Schema({
    productID: String,
    featureID: String
}, {collection: 'product_features'});
export default productFeaturesSchema;