const Student = require('../models/Student');
const Test = require('../models/Test');

// View test results for a specific student
exports.viewTestResults = async (req, res) => {
    try {
        const studentId = req.params.studentId; // 🔥 FIXED
        const results = await Test.find({ studentId });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving test results', error });
    }
};

// View statistics for a specific student
exports.viewStatistics = async (req, res) => {
    try {
        const studentId = req.params.studentId; // 🔥 FIXED
        const tests = await Test.find({ studentId });
        const totalTests = tests.length;
        const passedTests = tests.filter(test => test.score >= 50).length;
        const statistics = {
            totalTests,
            passedTests,
            passRate: totalTests ? (passedTests / totalTests) * 100 : 0
        };
        res.status(200).json(statistics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving statistics', error });
    }
};
