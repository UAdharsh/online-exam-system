import React, { useEffect, useState } from 'react';
import { getStudentResults } from '../utils/api';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getStudentResults();
                setResults(data);
            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-dashboard">
            <h2>Your Test Results</h2>
            {results.length === 0 ? (
                <p>No results available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id}>
                                <td>{result.testName}</td>
                                <td>{result.score}</td>
                                <td>{new Date(result.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentDashboard;