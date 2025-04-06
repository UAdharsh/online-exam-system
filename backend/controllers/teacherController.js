// backend/controllers/teacherController.js

const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Test = require('../models/Test');

// Create a new student account
exports.createStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newStudent = new Student({ name, email, password });
        await newStudent.save();
        res.status(201).json({ message: 'Student account created successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student account', error });
    }
};

// Validate student account
exports.validateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        student.isValidated = true;
        await student.save();
        res.status(200).json({ message: 'Student account validated successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error validating student account', error });
    }
};

// Create a new subject
exports.createSubject = async (req, res) => {
    try {
        const { name } = req.body;
        const newSubject = new Subject({ name });
        await newSubject.save();
        res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
    } catch (error) {
        res.status(500).json({ message: 'Error creating subject', error });
    }
};

// Create a new test
exports.createTest = async (req, res) => {
    try {
        const { subjectId, questions } = req.body;
        const newTest = new Test({ subject: subjectId, questions });
        await newTest.save();
        res.status(201).json({ message: 'Test created successfully', test: newTest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating test', error });
    }
};

// View results of each student
exports.viewStudentResults = async (req, res) => {
    try {
        const results = await Test.find({}).populate('subject').populate('student');
        res.status(200).json({ message: 'Results retrieved successfully', results });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving results', error });
    }
};

// View results of each subject
exports.viewSubjectResults = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const results = await Test.find({ subject: subjectId }).populate('student');
        res.status(200).json({ message: 'Subject results retrieved successfully', results });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subject results', error });
    }
};

// View overall statistics of results
exports.viewOverallStatistics = async (req, res) => {
    try {
        const totalTests = await Test.countDocuments();
        const totalStudents = await Student.countDocuments();
        const totalSubjects = await Subject.countDocuments();
        res.status(200).json({ totalTests, totalStudents, totalSubjects });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving overall statistics', error });
    }
};