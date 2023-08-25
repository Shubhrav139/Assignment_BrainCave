const mongoose = require("mongoose");

//setting connection
const dbconnect = async function () {
  try {
    await mongoose.connect(
      "mongodb+srv://Shubhrav:Fc5hacgtQIqu7vgx@cluster1.azopekx.mongodb.net/Users",
      {
        useNewUrlParser: true,
      }
    );

    return Promise.resolve("DB connection established!");
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

//exporting connect promise
module.exports = dbconnect;
