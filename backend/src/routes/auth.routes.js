const { loginUser, registerUser, logoutUser } = require('../controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router;