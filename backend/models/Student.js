const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    testsTaken: [{
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test',
        },
        score: {
            type: Number,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);