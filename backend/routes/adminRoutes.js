const express = require('express');
const {
    createTeacher,
    createStudent,
    validateAccount,
    createSubject,
    createTest,
    viewStudentResults,
    viewSubjectResults,
    viewOverallStatistics
} = require('../controllers/adminController');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-teacher', isAuthenticated, createTeacher);
router.post('/create-student', isAuthenticated, createStudent);
router.post('/validate-account', isAuthenticated, validateAccount);
router.post('/create-subject', isAuthenticated, createSubject);
router.post('/create-test', isAuthenticated, createTest);
router.get('/student-results/:studentId', isAuthenticated, viewStudentResults);
router.get('/subject-results/:subjectId', isAuthenticated, viewSubjectResults);
router.get('/overall-statistics', isAuthenticated, viewOverallStatistics);

module.exports = router;