import roleModel from "./roles-model.js";

export const daoFindRoleNameForID = (roleID) => roleModel.find({_id:roleID});
export const daoAddRole = (role) => roleModel.create(role);
export const daoDeleteRole= (roleID) => roleModel.deleteOne({_id: roleID});
export const daoUpdateRole = (roleID, updatedRole) => roleModel.updateOne({_id: roleID}, {$set: updatedRole})