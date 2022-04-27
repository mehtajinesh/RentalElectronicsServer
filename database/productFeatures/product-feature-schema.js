import mongoose from 'mongoose';

const productFeaturesSchema = mongoose.Schema({
    productID: mongoose.Schema.Types.ObjectId,
    featureID: mongoose.Schema.Types.ObjectId
}, {collection: 'product_features'});
export default productFeaturesSchema;