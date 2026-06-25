const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('../src/routes/blog.routes');
const projectRoutes = require('../src/routes/project.routes');
const careerRoutes = require('../src/routes/career.routes');
const leadRoutes = require("../src/routes/lead.routes");
const testimonialRoutes = require("../src/routes/testimonial.routes");
 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials:true
}))

app.use('/api/auth/', authRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/testimonial', testimonialRoutes);


module.exports = app;