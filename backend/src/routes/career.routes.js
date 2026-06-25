const express = require("express");

const { getAllCareers, getCareerById, applyForCareer, createCareer , updateApplicationStatus, deleteCareer, updateCareer, getApplicationsByCareer} = require('../controllers/career.controller');
const { authAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();


router.get('/', getAllCareers);
router.get('/:id', getCareerById);
router.post('/:id/apply', applyForCareer);



router.post('/', authAdmin,createCareer);
router.put('/:id', authAdmin,updateCareer);
router.delete("/:id", authAdmin,deleteCareer);
router.get('/:id/applications', authAdmin,getApplicationsByCareer);
router.patch('/applications/:id/status', authAdmin,updateApplicationStatus);


module.exports = router;