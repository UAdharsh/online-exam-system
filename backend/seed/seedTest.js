const mongoose = require('mongoose');
const Test = require('../models/Test'); // adjust path
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher'); // make sure you have a Teacher model
require('dotenv').config();

const seedTests = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    const subject = await Subject.findOne(); // gets any subject
    const teacher = await Teacher.findOne(); // gets any teacher

    if (!subject || !teacher) {
      console.warn('⚠️ Subject or Teacher not found. Please seed them first.');
      return process.exit(1);
    }

    // Optional: Clear existing tests
    await Test.deleteMany({});

    const testData = [
      {
        subject: subject._id,
        createdBy: teacher._id,
        duration: 30,
        questions: [
          {
            questionText: "What is 2 + 2?",
            marks: 1,
            options: [
              { optionText: "3", isCorrect: false },
              { optionText: "4", isCorrect: true },
              { optionText: "5", isCorrect: false },
            ],
          },
          {
            questionText: "What is the square root of 16?",
            marks: 1,
            options: [
              { optionText: "3", isCorrect: false },
              { optionText: "4", isCorrect: true },
              { optionText: "5", isCorrect: false },
            ],
          },
        ]
      }
    ];

    const created = await Test.insertMany(testData);
    console.log(`🚀 Inserted ${created.length} test(s)`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding tests:', err);
    process.exit(1);
  }
};

seedTests();
