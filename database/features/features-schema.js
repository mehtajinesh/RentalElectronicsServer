import mongoose from 'mongoose';

const featureSchema = mongoose.Schema({
    featureName: String,
    featureValue: String,
}, {collection: 'features'});
export default featureSchema;