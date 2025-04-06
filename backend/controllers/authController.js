const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to find user dynamically
const findUserByEmail = async (email) => {
    return await Admin.findOne({ email }) ||
           await Student.findOne({ email }) ||
           await Teacher.findOne({ email });
};

// Signup function
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser;

        if (role === 'admin') newUser = new Admin({ name, email, password: hashedPassword });
        else if (role === 'teacher') newUser = new Teacher({ name, email, password: hashedPassword });
        else if (role === 'student') newUser = new Student({ name, email, password: hashedPassword });
        else return res.status(400).json({ message: 'Invalid role' });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Signin function
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const role = user instanceof Admin ? 'admin' :
                     user instanceof Teacher ? 'teacher' :
                     user instanceof Student ? 'student' : 'unknown';

        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
