import rolesModel from "./roles-model.js";

export const daoAddRole = (role) => rolesModel.create(role);
export const daoFindRoleNameForID = (roleID) => rolesModel.findOne({_id: roleID});
export const daoFindRoleIDForName = (roleName) => rolesModel.findOne({roleName: roleName});
export const daoUpdateRole = (roleID, updatedRole) => rolesModel.updateOne({_id: roleID}, {$set: updatedRole})
export const daoDeleteRole = (roleID) => rolesModel.deleteOne({_id: roleID});