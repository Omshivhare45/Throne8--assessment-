const express = require('express');
const { getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, adminGetAllBlogs,
} = require('../controllers/blog.controller');
const { authAdmin } = require('../middlewares/auth.middleware');


const router = express.Router();

router.get('/',      getAllBlogs);
router.get('/:slug', getBlogBySlug);

router.post("/", authAdmin, createBlog);


module.exports = router;