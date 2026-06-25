const express = require( 'express');

const{ createCaseStudy, getAllCaseStudies, getCaseStudyBySlug, updateCaseStudy, deleteCaseStudy, adminGetAllCaseStudies  } = require('../controllers/caseStudy.controller');
const { authAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getAllCaseStudies);
router.get("/:slug", getCaseStudyBySlug);

router.get('/admin/all', authAdmin, adminGetAllCaseStudies);
router.post('/', authAdmin, createCaseStudy);
router.put("/:id", authAdmin, updateCaseStudy);
router.delete("/:id", authAdmin,deleteCaseStudy);

module.exports = router;