import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getStudentResults, attendTest } from '../utils/api';

const StudentPage = () => {
    const { user } = useContext(AuthContext);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await getStudentResults(user.id);
                setResults(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [user.id]);

    const handleAttendTest = async (testId) => {
        try {
            await attendTest(testId);
            // Redirect or update state as needed after attending the test
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <h2>Your Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.id}>
                            <td>{result.subject}</td>
                            <td>{result.score}</td>
                            <td>{new Date(result.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Available Tests</h2>
            {/* Render available tests for the student to attend */}
            {/* Example: <button onClick={() => handleAttendTest(test.id)}>Attend Test</button> */}
        </div>
    );
};

export default StudentPage;