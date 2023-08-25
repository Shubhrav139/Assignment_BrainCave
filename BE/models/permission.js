const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    permission: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const permissionModel = mongoose.model("permissions", PermissionSchema);

module.exports = permissionModel;
