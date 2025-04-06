const mongoose = require('mongoose');
const Subject = require('../models/Subject'); // Adjust path if needed
require('dotenv').config();

// Example subject data
const subjectData = [
  { name: 'Mathematics' },
  { name: 'Physics' },
  { name: 'Chemistry' },
  { name: 'Biology' },
  { name: 'English' }
];

const seedSubjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected ✅');

    // Optional: Clear existing subjects
    await Subject.deleteMany({});
    console.log('Old subjects cleared 🧹');

    // Insert new subjects
    const inserted = await Subject.insertMany(subjectData);
    console.log(`Inserted ${inserted.length} subjects 🚀`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding subjects ❌', err);
    process.exit(1);
  }
};

seedSubjects();
