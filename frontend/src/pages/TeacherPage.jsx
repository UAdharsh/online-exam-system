import React, { useEffect, useState } from 'react';
import { getStudents, getTests, createTest } from '../utils/api';
import TestCreation from '../components/TestCreation';
import StudentDashboard from '../components/StudentDashboard';

const TeacherPage = () => {
    const [students, setStudents] = useState([]);
    const [tests, setTests] = useState([]);
    const [isCreatingTest, setIsCreatingTest] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await getStudents();
            setStudents(response.data);
        };

        const fetchTests = async () => {
            const response = await getTests();
            setTests(response.data);
        };

        fetchStudents();
        fetchTests();
    }, []); 

    const handleCreateTest = () => {
        setIsCreatingTest(true);
    };

    const handleTestCreated = () => {
        setIsCreatingTest(false);
        // Optionally refresh tests or perform other actions
    };

    return (
        <div className="teacher-page">
            <h1>Teacher Dashboard</h1>
            <button onClick={handleCreateTest}>Create Test</button>
            {isCreatingTest && <TestCreation onTestCreated={handleTestCreated} />}
            <StudentDashboard students={students} tests={tests} />
        </div>
    );
};

export default TeacherPage;