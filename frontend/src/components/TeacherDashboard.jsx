import React, { useEffect, useState } from 'react';
import { getStudents, getTests, getResults } from '../utils/api';
import '../styles/Dashboard.css';

const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchStudents();
        fetchTests();
        fetchResults();
    }, []);

    const fetchStudents = async () => {
        const data = await getStudents();
        setStudents(data);
    };

    const fetchTests = async () => {
        const data = await getTests();
        setTests(data);
    };

    const fetchResults = async () => {
        const data = await getResults();
        setResults(data);
    }; 

    return (
        <div className="teacher-dashboard">
            <h1>Teacher Dashboard</h1>
            <div className="dashboard-section">
                <h2>Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="dashboard-section">
                <h2>Tests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => (
                            <tr key={test._id}>
                                <td>{test.subject}</td>
                                <td>{new Date(test.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="dashboard-section">
                <h2>Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Test</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => (
                            <tr key={result._id}>
                                <td>{result.studentName}</td>
                                <td>{result.testTitle}</td>
                                <td>{result.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherDashboard;