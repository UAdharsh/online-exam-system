import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../utils/api';
import '../styles/HomePage.css';

const HomePage = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const getStatistics = async () => {
            try {
                const data = await fetchStatistics();
                setStatistics(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        getStatistics();
    }, []); 

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-page">
            <h1>Online Exam Management System</h1>
            <h2>Overall Statistics</h2>
            {statistics ? (
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Total Tests Conducted</th>
                            <th>Average Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statistics.map((stat) => (
                            <tr key={stat.subject}>
                                <td>{stat.subject}</td>
                                <td>{stat.totalTests}</td>
                                <td>{stat.averageScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No statistics available.</p>
            )}
        </div>
    );
};

export default HomePage;