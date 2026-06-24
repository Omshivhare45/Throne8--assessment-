const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const blogRoutes = require('../src/routes/blog.routes');
const projectRoutes = require('../src/routes/project.routes');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5137',
    credentials:true
}))

app.use('/api/auth/', authRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/projects', projectRoutes);

module.exports = app;