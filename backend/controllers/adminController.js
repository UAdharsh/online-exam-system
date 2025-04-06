const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Test = require('../models/Test');
const bcrypt = require('bcrypt');

// Create a new teacher account
exports.createTeacher = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new Teacher({ name, email, password: hashedPassword });
        await newTeacher.save();
        res.status(201).json({ message: 'Teacher account created successfully', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Error creating teacher account', error });
    }
};

// Create a new student account
exports.createStudent = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({ name, email, password: hashedPassword });
        await newStudent.save();
        res.status(201).json({ message: 'Student account created successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student account', error });
    }
};

// Validate accounts created through signup
exports.validateAccount = async (req, res) => {
    try {
        const { email } = req.body;
        const teacher = await Teacher.findOne({ email });
        const student = await Student.findOne({ email });
        
        if (teacher || student) {
            return res.status(200).json({ message: 'Account is valid' });
        }
        res.status(404).json({ message: 'Account not found' });
    } catch (error) {
        res.status(500).json({ message: 'Error validating account', error });
    }
};

// Create a new subject
exports.createSubject = async (req, res) => {
    try {
        const { name } = req.body;
        const existingSubject = await Subject.findOne({ name });
        if (existingSubject) {
            return res.status(400).json({ message: 'Subject with this name already exists' });
        }
        const newSubject = new Subject({ name });
        await newSubject.save();
        res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
    } catch (error) {
        res.status(500).json({ message: 'Error creating subject', error });
    }
};

// Create a new online test
// exports.createTest = async (req, res) => {
//     try {
//         const { subjectId, questions } = req.body;
//         const newTest = new Test({ subject: subjectId, questions });
//         await newTest.save();
//         res.status(201).json({ message: 'Test created successfully', test: newTest });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating test', error });
//     }
// };

// Create a new online test
exports.createTest = async (req, res) => {
    try {
        const { subjectId, questions, duration, createdBy } = req.body;

        // Basic validation
        if (!subjectId || !questions || !duration || !createdBy) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Optionally verify the subject and teacher exist
        // (skipped here but recommended in production)

        const newTest = new Test({
            subject: subjectId,
            questions,
            duration,
            createdBy
        });

        await newTest.save();

        res.status(201).json({
            message: 'Test created successfully',
            test: newTest
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating test',
            error: error.message || error
        });
    }
};


// // View results of each student
// exports.viewStudentResults = async (req, res) => {
//     try {
//         const results = await Test.find({}).populate('subject');
//         res.status(200).json({ results });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching results', error });
//     }
// };

// // View results of each student
exports.viewStudentResults = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find tests where this student has a result entry
        const tests = await Test.find({ "results.student": studentId })
            .populate('subject')
            .populate('results.student'); // optional, for full student info

        // Filter out only the result for the student in each test
        const studentResults = tests.map(test => {
            const studentResult = test.results.find(r => r.student._id.toString() === studentId);
            return {
                testId: test._id,
                subject: test.subject.name,
                score: studentResult?.score,
                submittedAt: studentResult?.submittedAt,
                totalMarks: test.questions.reduce((sum, q) => sum + q.marks, 0),
            };
        });

        res.status(200).json({ studentResults });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student results', error });
    }
};

// // View results of each subject
// exports.viewSubjectResults = async (req, res) => {
//     try {
//         const subjects = await Subject.find({}).populate('tests');
//         res.status(200).json({ subjects });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching subject results', error });
//     }
// };

// View results of each subject
exports.viewSubjectResults = async (req, res) => {
    try {
        const subjects = await Subject.find({})
            .populate({
                path: 'tests',
                populate: {
                    path: 'results.student',
                    model: 'Student'
                }
            })
            .populate({
                path: 'tests',
                populate: {
                    path: 'subject',
                    model: 'Subject'
                }
            });

        res.status(200).json({ subjects });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject results', error });
    }
};

// View overall statistics of results
exports.viewOverallStatistics = async (req, res) => {
    try {
        const totalTeachers = await Teacher.countDocuments();
        const totalStudents = await Student.countDocuments();
        const totalTests = await Test.countDocuments();
        res.status(200).json({ totalTeachers, totalStudents, totalTests });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};