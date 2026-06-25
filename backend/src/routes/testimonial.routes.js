const express = require('express');

const { getAllTestimonials, adminGetAllTestimonials, createTestimonial, updateTestimonial, approveTestimonial, deleteTestimonial } = require("../controllers/testimonial.controller");

const { authAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get("/", getAllTestimonials);

router.get('/admin/all', authAdmin, adminGetAllTestimonials);
router.post("/", authAdmin, createTestimonial);
router.put('/:id', authAdmin, updateTestimonial);
router.patch('/:id/approve', authAdmin, approveTestimonial);
router.delete("/:id", authAdmin, deleteTestimonial);

module.exports = router;