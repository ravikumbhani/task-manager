// Packages
const express = require('express')

// Config Files
const { connectDB } = require('./config/database')

// Setting Environment
const dotenv = require('dotenv')
dotenv.config()

// Creating App
const app = express();

// Connect DB
connectDB();

// Applying Middleware
app.use(express.json());