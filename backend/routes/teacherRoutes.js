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

// Route for validating student accounts
router.post('/students/validate', isAuthenticated, validateStudent);

// Route for creating subjects
router.post('/subjects', isAuthenticated, createSubject);

// Route for creating online tests
router.post('/tests', isAuthenticated, createTest);

// Route for viewing results of each student
router.get('/results/students', isAuthenticated, viewStudentResults);

// Route for viewing results of each subject
router.get('/results/subjects', isAuthenticated, viewSubjectResults);

// Route for viewing overall statistics
router.get('/statistics', isAuthenticated, viewOverallStatistics);

module.exports = router;