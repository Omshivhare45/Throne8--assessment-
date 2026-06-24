const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5137',
    credentials:true
}))

app.use('/api/auth/', authRoutes);

module.exports = app;