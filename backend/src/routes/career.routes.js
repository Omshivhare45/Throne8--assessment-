const express = require("express");

const { getAllCareers, getCareerById, applyForCareer, createCareer , updateApplicationStatus, deleteCareer, updateCareer, getApplicationsByCareer} = require('../controllers/career.controller');

const router = express.Router();


router.get('/', getAllCareers);
router.get('/:id', getCareerById);


router.put('/', createCareer);
router.put('/:id', updateCareer);
router.delete("/:id", deleteCareer);
router.get('/:id/applications', getApplicationsByCareer);
router.patch('/applications/:id/status', updateApplicationStatus);
router.post('/:id/apply', applyForCareer);


module.exports = router;