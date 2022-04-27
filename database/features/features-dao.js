import featureModel from './features-model.js';

export const daoGetFeatureForID = (featureID) => featureModel.find({_id:featureID});
export const daoAddFeature = (feature) => featureModel.create(feature);
export const daoDeleteFeature = (featureID) => featureModel.deleteOne({_id: featureID});
export const daoUpdateFeature = (featureID, updated_feature) => featureModel.updateOne({_id: featureID}, {$set: updated_feature})