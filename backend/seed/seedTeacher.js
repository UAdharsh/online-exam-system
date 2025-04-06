require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Teacher = require('../models/Teacher');

const seedTeacher = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const hashedPassword = await bcrypt.hash('teacher123', 10);

    const teachers = [
        {
          name: 'Mr. Anderson',
          email: 'anderson@teacher.com',
          password: hashedPassword,
          subjects: [],
          createdTests: [],
        },
        {
          name: 'Ms. Carter',
          email: 'carter@teacher.com',
          password: hashedPassword,
          subjects: [],
          createdTests: [],
        },
        {
          name: 'Dr. Smith',
          email: 'smith@teacher.com',
          password: hashedPassword,
          subjects: [],
          createdTests: [],
        },
    ];

    try {
        await Teacher.deleteMany(); // Clean before seed
        await Teacher.insertMany(teachers);
        console.log('Teachers seeded');
        } catch (err) {
            console.error(err);
        } finally {
            mongoose.disconnect();
        }
};

seedTeacher();