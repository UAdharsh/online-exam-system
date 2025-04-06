const express = require('express');
const { 
    viewTestResults, 
    viewStatistics,
    attendTest,
    submitTest
} = require('../controllers/studentController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/results/:studentId', isAuthenticated, viewTestResults);
router.get('/statistics/:studentId', isAuthenticated, viewStatistics);
router.get('/test/:testId', isAuthenticated, attendTest);
router.post('/submit/:testId', isAuthenticated, submitTest);

module.exports = router;
