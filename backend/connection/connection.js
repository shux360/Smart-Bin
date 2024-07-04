const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://smartbin23rd:AVDcFUKdHEVKIRY2@smartbin.az3yzqn.mongodb.net/?retryWrites=true&w=majority&appName=SmartBin"
    );

    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};
connection();
