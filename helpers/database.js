// helpers/database.js

const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
  }
};

const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
