const express = require('express');
const {
  getAllBlogs, getBlogBySlug,
  createBlog, updateBlog, deleteBlog, adminGetAllBlogs,
} = require('../controllers/blog.controller');
const { authUser } = require('../middlewares/auth.middleware');


const router = express.Router();

router.get('/',      getAllBlogs);
router.get('/:slug', getBlogBySlug);

router.post("/", authUser ,createBlog);


module.exports = router;