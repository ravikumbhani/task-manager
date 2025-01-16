// Packages
const express = require('express')

// Setting Environment
const dotenv = require('dotenv')
dotenv.config()

// Creating App
const app = express();

// Applying Middleware
app.use(express.json());

// Starting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
