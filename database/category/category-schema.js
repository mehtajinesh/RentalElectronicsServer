import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    categoryName: {type:String, required:true, unique:true},
    categoryDescription: {type:String}
}, {collection: 'category'});
export default categorySchema;