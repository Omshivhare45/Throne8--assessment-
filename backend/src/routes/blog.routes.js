const express = require('express');
const {
  getAllBlogs, getBlogBySlug, createBlog,
  adminGetAllBlogs, updateBlog, deleteBlog,
} = require('../controllers/blog.controller');
const { authAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// public
router.get('/',      getAllBlogs);
router.get('/:slug', getBlogBySlug);


router.get('/admin/all', authAdmin, adminGetAllBlogs);
router.post('/',         authAdmin, createBlog);
router.put('/:id',       authAdmin, updateBlog);
router.delete('/:id',    authAdmin, deleteBlog);

module.exports = router;