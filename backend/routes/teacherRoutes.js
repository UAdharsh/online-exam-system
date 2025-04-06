// backend/Routes/teacherRoutes.js

const express = require('express');
const {
    createStudent,
    validateStudent,
    createSubject,
    createTest,
    viewStudentResults,
    viewSubjectResults,
    viewOverallStatistics
} = require('../controllers/teacherController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for creating student accounts
router.post('/students', isAuthenticated, createStudent);

// ✅ FIXED route to accept studentId in params
router.post('/students/validate/:studentId', isAuthenticated, validateStudent);

// Route for creating subjects
router.post('/subjects', isAuthenticated, createSubject);

// ✅ Include test duration and creator
router.post('/tests', isAuthenticated, createTest);

// ✅ View all student results
router.get('/results/students', isAuthenticated, viewStudentResults);

// ✅ FIXED: Accept subjectId param
router.get('/results/subjects/:subjectId', isAuthenticated, viewSubjectResults);

// Route for viewing overall statistics
router.get('/statistics', isAuthenticated, viewOverallStatistics);

module.exports = router;
