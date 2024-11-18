const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {});

  console.log(
    `Connect MongoDB : ${conn.connection.host}`
  );
};

module.exports = connectDB;
