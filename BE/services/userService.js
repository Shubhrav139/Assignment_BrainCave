const userModel = require("../models/user");
const permissionModel = require("../models/permission");
const bcrypt = require("bcryptjs");

async function registerUser(data) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    let newData = {
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    };

    const userData = new userModel(newData);

    const res = await userData.save();
    return res;
  } catch (error) {
    throw error;
  }
}

async function loginUser(data) {
  try {
    const { email, password } = data;
    let permission;

    const userDetails = await userModel.findOne(
      { email: email.toLowerCase() },
      { role: 1, password: 1 }
    );

    const authenticated = await bcrypt.compare(password, userDetails.password);

    if (authenticated) {
      if (userDetails.role === "super-admin") {
        permission = await permissionModel.findOne(
          { role: userDetails.role },
          { permission: 1 }
        );
        return permission;
      } else if (userDetails.role === "admin") {
        permission = await permissionModel.findOne(
          { role: userDetails.role },
          { permission: 1 }
        );
        return permission;
      } else if (userDetails.role === "user") {
        permission = await permissionModel.findOne(
          { role: userDetails.role },
          { permission: 1 }
        );
        return permission;
      } else {
        throw new Error("Role not recognised!");
      }
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    throw err;
  }
}

async function deleteUser(userId) {
  try {
    await userModel.findByIdAndDelete({ _id: userId });
  } catch (error) {
    throw error;
  }
}

async function editUser(userId, data) {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: data },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function getAllUser() {
  try {
    const allUsers = await userModel.find({}, { __v: 0, password: 0 });
    return allUsers;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  deleteUser,
  editUser,
  loginUser,
  getAllUser,
};
