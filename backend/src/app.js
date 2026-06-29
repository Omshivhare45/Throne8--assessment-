const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const cookieParser = require('cookie-parser');

const {errorHandler} = require('../src/middlewares/errorHanlder');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('../src/routes/blog.routes');
const projectRoutes = require('../src/routes/project.routes');
const careerRoutes = require('../src/routes/career.routes');
const leadRoutes = require("../src/routes/lead.routes");
const testimonialRoutes = require("../src/routes/testimonial.routes");
const caseStudyRoutes = require("../src/routes/casestudy.routes");
const bootstrapRoutes = require('../src/routes/bootstrap.routes');
 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(helmet());
console.log("CLIENT_URL:", process.env.CLIENT_URL);
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
app.use('/api/casestudy', caseStudyRoutes);
app.use("/api/bootstrap", bootstrapRoutes);

app.get('/api/health', (req, res) => res.status(200).json({status:"OK"}));
app.use((req,res) => res.status(404).json({message: "Route not found"}));
app.use(errorHandler);

module.exports = app;