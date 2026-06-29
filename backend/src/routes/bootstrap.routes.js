const express = require('express');
const { bootstrapAdmin } = require('../controllers/bootstrap.controller');

const router = express.Router();

router.post('/admin', bootstrapAdmin);

module.exports = router;