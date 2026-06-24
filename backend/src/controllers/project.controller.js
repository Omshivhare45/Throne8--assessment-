const Project = require('../models/project.model');
const slugify = require('slugify');


const createProject = async (req, res) => {
    try{
        const { name, description, businessproblem, solution, features, techStack, screenshots, results, liveurl, githubUrl, industry, status, completedAt } = req.body;

            if( !name || !description || ! businessproblem || !solution ){
                return res.status(400).json({
                    message: "enter the required fields"
                })
            }

            const slug = slugify( name, {lower: true, strict: true});
            const exists = await Project.findOne({
                slug
            });

            console.log("Exists:", exists);

            if (exists) return res.status(409).json({ 
                message: 'Project with this name already exists' 
            });

            const project = await Project.create({
            name, slug,description, businessproblem, solution, features, techStack, screenshots, results, liveurl, githubUrl, industry, status, completedAt
            });

            return res.status(201).json({
                message: "Project created successfully",
                project
            });
    }catch(err){
        console.log("project creation error : ", err);
        return res.status(401).json({
            message: "Internal server error"
        })
    }
}

const getAllProjects = async (req, res) => {
  try {
    const { industry, featured } = req.query;
    const query = { status: 'published' };
 
    if (industry) query.industry = industry;
    if (featured === 'true') query.featured = true;
 
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .select('-screenshots');
 
    return res.status(200).json({ projects });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: 'published' });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    return res.status(200).json({ project });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
 
    if (req.body.name && req.body.name !== project.name) {
      req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    }
 
    Object.assign(project, req.body);
    await project.save();
 
    return res.status(200).json({ message: 'Project updated', project });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    return res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
 

module.exports = { getAllProjects, createProject, getProjectBySlug, updateProject, deleteProject };