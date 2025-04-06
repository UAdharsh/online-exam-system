const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User signup
router.post('/signup', authController.signup);

// User signin
router.post('/signin', authController.signin);

// Account validation
// router.post('/validate', authController.validateAccount);

module.exports = router;