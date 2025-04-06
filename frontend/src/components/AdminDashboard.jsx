import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
        fetchSubjects();
        fetchTests();
    }, []);

    const fetchTeachers = async () => {
        const response = await api.get('/admin/teachers');
        setTeachers(response.data);
    };

    const fetchStudents = async () => {
        const response = await api.get('/admin/students');
        setStudents(response.data);
    };

    const fetchSubjects = async () => {
        const response = await api.get('/admin/subjects');
        setSubjects(response.data);
    };

    const fetchTests = async () => {
        const response = await api.get('/admin/tests');
        setTests(response.data);
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-section">
                <h2>Teachers</h2>
                <Link to="/create-teacher">Create Teacher</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher._id}>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="dashboard-section">
                <h2>Students</h2>
                <Link to="/create-student">Create Student</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="dashboard-section">
                <h2>Subjects</h2>
                <Link to="/create-subject">Create Subject</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject._id}>
                                <td>{subject.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="dashboard-section">
                <h2>Tests</h2>
                <Link to="/create-test">Create Test</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Test Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test) => (
                            <tr key={test._id}>
                                <td>{test.subject}</td>
                                <td>{test.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;