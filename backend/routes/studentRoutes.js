const express = require('express');
const { 
    viewTestResults, 
    viewStatistics
} = require('../controllers/studentController'); // 🔥 FIXED FILE REFERENCE
const { isAuthenticated } = require('../middlewares/authMiddleware'); // 🔥 Fixed function name

const router = express.Router();

router.get('/results/:studentId', isAuthenticated, viewTestResults); // 🔥 Uses correct param name
router.get('/statistics/:studentId', isAuthenticated, viewStatistics);

module.exports = router;
