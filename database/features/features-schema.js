import mongoose from 'mongoose';

const featureSchema = mongoose.Schema({
    FeatureName: {type: String, required: true}, FeatureValue: {type: String, required: true}
}, {collection: 'features'});
export default featureSchema;