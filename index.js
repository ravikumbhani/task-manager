// Packages
const express = require('express')
const cookieParser = require('cookie-parser');

// Config Files
const { connectDB } = require('./config/database')
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.route');

// Setting Environment
const dotenv = require('dotenv')
dotenv.config()

// Creating App
const app = express();

// Connect DB
connectDB();

// Applying Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/task', taskRoutes);
app.use('/', (req, res) => {
  return res.status(200).json({ success: true, message: 'Server Running' });
})

// Starting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});