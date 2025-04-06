import React, { useState } from 'react';
import axios from 'axios';

const TestCreation = () => {
    const [subject, setSubject] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
    const [testName, setTestName] = useState('');
    const [duration, setDuration] = useState('');

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const testData = {
            testName,
            subject,
            duration,
            questions,
        };

        try {
            const response = await axios.post('/api/tests', testData);
            alert('Test created successfully!');
            // Reset form
            setTestName('');
            setSubject('');
            setDuration('');
            setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
        } catch (error) {
            console.error('Error creating test:', error);
            alert('Failed to create test. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create Online Test</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Test Name:</label>
                    <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} required />
                </div>
                <div>
                    <label>Subject:</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div>
                    <label>Duration (in minutes):</label>
                    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>
                <h3>Questions</h3>
                {questions.map((q, index) => (
                    <div key={index}>
                        <div>
                            <label>Question:</label>
                            <input type="text" name="question" value={q.question} onChange={(e) => handleQuestionChange(index, e)} required />
                        </div>
                        <div>
                            <label>Options:</label>
                            {q.options.map((option, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, i, e)}
                                    required
                                />
                            ))}
                        </div>
                        <div>
                            <label>Correct Answer:</label>
                            <input type="text" name="answer" value={q.answer} onChange={(e) => handleQuestionChange(index, e)} required />
                        </div>
                        <button type="button" onClick={() => removeQuestion(index)}>Remove Question</button>
                    </div>
                ))}
                <button type="button" onClick={addQuestion}>Add Question</button>
                <button type="submit">Create Test</button>
            </form>
        </div>
    );
};

export default TestCreation;