const mongoose = require('mongoose')

require('dotenv').config();

exports.connectDB = async () => {
    try {
        console.log('process.env.MONGODB_URL', process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connection Successful")
    } catch (error) {
        console.log(`Database Connection Failed: ${error.message}`)
        console.error(error);
        process.exit(1);
    }
};