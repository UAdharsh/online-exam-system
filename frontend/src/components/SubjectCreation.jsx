import React, { useState } from 'react';
import axios from 'axios';

const SubjectCreation = () => {
    const [subjectName, setSubjectName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/subjects', { name: subjectName });
            setMessage(response.data.message);
            setSubjectName('');
        } catch (error) {
            setMessage('Error creating subject. Please try again.');
        }
    };

    return (
        <div className="subject-creation">
            <h2>Create a New Subject</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input
                        type="text"
                        id="subjectName"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Subject</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SubjectCreation;