import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import { getAllTeachers, getAllStudents, getAllSubjects, getAllTests } from '../utils/api';

const AdminPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const teachersData = await getAllTeachers();
            const studentsData = await getAllStudents();
            const subjectsData = await getAllSubjects();
            const testsData = await getAllTests();

            setTeachers(teachersData);
            setStudents(studentsData);
            setSubjects(subjectsData);
            setTests(testsData);
        };

        fetchData();
    }, []); 

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <AdminDashboard 
                teachers={teachers} 
                students={students} 
                subjects={subjects} 
                tests={tests} 
            />
        </div>
    );
};

export default AdminPage;