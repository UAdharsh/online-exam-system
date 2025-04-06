const mongoose = require('mongoose');
const Subject = require('./Subject');

const TestSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true
            },
            options: [
                {
                    optionText: {
                        type: String,
                        required: true
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true
                    }
                }
            ],
            marks: {
                type: Number,
                required: true
            }
        }
    ],
    duration: {
        type: Number,
        required: true // duration in minutes
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    results: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            submittedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TestSchema.post('save', async function (doc) {
    try {
        await Subject.findByIdAndUpdate(doc.subject, {
            $addToSet: { tests: doc._id } // avoids duplicate test IDs
        });
    } catch (error) {
        console.error('Error adding test to subject:', error);
    }
});

module.exports = mongoose.model('Test', TestSchema);