import mongoose from 'mongoose';
import featureSchema from './features-schema.js'
const featureModel = mongoose
    .model('featureModel', featureSchema);
export default featureModel;