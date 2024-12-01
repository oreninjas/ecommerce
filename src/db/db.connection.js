const mongoose = require('mongoose');
const { DB_NAME } = require('../utils/constants');

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log('Connected to MongoDB!')
  } catch (error) {
    console.log('Error occured while connecting to MongoDB !! ', error);
  }
};

module.exports = connectDB;