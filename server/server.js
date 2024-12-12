require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const connectDB = require('./utils/db');

const app = express();

//middleware
app.use(express.json());
app.use(cors({origin: '*'}));

//routes
app.use('/auth', authRoutes);

//connect to mongodb and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
