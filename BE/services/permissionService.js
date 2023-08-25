const permissionModel = require("../models/permission");

async function getPermission(data) {
  try {
    const permission = await permissionModel.findOne({ role: data.role });
    return permission;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPermission,
};
