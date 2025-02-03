const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const authRoutes = require('./routes/authRoutes'); 
const postRoutes = require('./routes/postRoutes');

// ✅ Use Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
