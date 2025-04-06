require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

const seedStudent = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const hashedPassword = await bcrypt.hash('student123', 10);

    const students = [
        {
            name: 'John Doe',
            email: 'john@student.com',
            password: hashedPassword,
        },
        {
            name: 'Jane Smith',
            email: 'jane@student.com',
            password: hashedPassword,
        }
    ];

    try {
        await Student.deleteMany(); // Clean before seed
        await Student.insertMany(students);
        console.log('Students seeded');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

seedStudent();
