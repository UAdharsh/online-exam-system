const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);