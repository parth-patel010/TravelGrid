const express = require('express');
const router = express.Router();
const { loginUser, registerUser, googleAuth } = require('../controller/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/google', googleAuth);

module.exports = router;
