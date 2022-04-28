import mongoose from 'mongoose';

const recentlyViewedSchema = mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    productID: mongoose.Schema.Types.ObjectId
}, {collection: 'recently_viewed'});
export default recentlyViewedSchema;