const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    createdTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);