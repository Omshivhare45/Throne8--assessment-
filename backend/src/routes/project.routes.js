const express = require('express');

const{ getAllProjects, getProjectBySlug, createProject, updateProject, deleteProject } = require('../controllers/project.controller');
const { authAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/',      getAllProjects);
router.get('/:slug', getProjectBySlug);

router.post('/', authAdmin,createProject);
router.put('/:id',authAdmin, updateProject);
router.delete('/:id',authAdmin, deleteProject);

module.exports = router;