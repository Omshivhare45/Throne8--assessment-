const express = require("express");

const { getAllCareers, getCareerById, applyForCareer, createCareer } = require('../controllers/career.controller');

const router = express.Router();

router.get('/', getAllCareers);
router.get('/:id', getCareerById);


router.put('/:id', createCareer);

module.exports = router;