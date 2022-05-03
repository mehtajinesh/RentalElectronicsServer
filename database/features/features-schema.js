import mongoose from 'mongoose';

const featureSchema = mongoose.Schema({
    featureName: {type: String, required: true}, featureValue: {type: String, required: true}
}, {collection: 'features'});
export default featureSchema;