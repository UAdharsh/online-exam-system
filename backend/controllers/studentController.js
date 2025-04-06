const Test = require('../models/Test');
const mongoose = require('mongoose');

// ✅ View test results for a specific student
exports.viewTestResults = async (req, res) => {
    try {
        const { studentId } = req.params;
        const results = await Test.find({ 'results.student': studentId });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving test results', error });
    }
};

// ✅ View statistics for a specific student
exports.viewStatistics = async (req, res) => {
    try {
        const { studentId } = req.params;
        const tests = await Test.find({ 'results.student': studentId });

        let totalTests = 0;
        let passedTests = 0;

        tests.forEach(test => {
            const result = test.results.find(r => r.student.toString() === studentId);
            if (result) {
                totalTests++;
                if (result.score >= 50) passedTests++;
            }
        });

        const stats = {
            totalTests,
            passedTests,
            passRate: totalTests ? (passedTests / totalTests) * 100 : 0
        };

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving statistics', error });
    }
};

// ✅ Attend Test
exports.attendTest = async (req, res) => {
    try {
        const { testId } = req.params;
        const test = await Test.findById(testId).populate('subject');
        if (!test) return res.status(404).json({ message: 'Test not found' });

        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching test data', error });
    }
};

// ✅ Submit Test
exports.submitTest = async (req, res) => {
    try {
        const { testId } = req.params;
        const { answers } = req.body;
        const studentId = req.user._id;

        const test = await Test.findById(testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        let score = 0;

        test.questions.forEach((question, i) => {
            const correctOption = question.options.find(o => o.isCorrect);
            if (answers[i] && correctOption && correctOption.optionText === answers[i]) {
                score += question.marks;
            }
        });

        test.results.push({
            student: studentId,
            score
        });

        await test.save();

        res.status(200).json({ message: 'Test submitted successfully', score });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting test', error });
    }
};
