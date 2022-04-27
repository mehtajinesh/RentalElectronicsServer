import mongoose from 'mongoose';
import roleSchema from './roles-schema.js'
const roleModel = mongoose
    .model('roleModel', roleSchema);
export default roleModel;