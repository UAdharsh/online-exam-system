require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminData = {
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashedPassword,
    };

    try {
        await Admin.deleteMany(); // Clean before seed
        const admin = new Admin(adminData);
        await admin.save();
        console.log('Admin seeded');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

seedAdmin();