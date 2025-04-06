import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change this if your backend URL is different

// ✅ Default Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // if using cookies (optional)
});

// =======================
// ✅ AUTH API CALLS
// =======================
export const signUp = async (userData) => {
    return await api.post(`/auth/signup`, userData);
};

export const signIn = async (credentials) => {
    return await api.post(`/auth/signin`, credentials);     // ${API_URL}
};

// =======================
// ✅ ADMIN API CALLS
// =======================
// Create Teacher
export const adminCreateTeacher = async (teacherData, token) => {
    return await axios.post(`${API_URL}/admin/create-teacher`, teacherData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Create Student
export const adminCreateStudent = async (studentData, token) => {
    return await axios.post(`${API_URL}/admin/create-student`, studentData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Validate Account
export const adminValidateAccount = async (email, token) => {
    return await axios.post(`${API_URL}/admin/validate-account`, { email }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Create Subject
export const adminCreateSubject = async (subjectData, token) => {
    return await axios.post(`${API_URL}/admin/create-subject`, subjectData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Create Test
export const adminCreateTest = async (testData, token) => {
    return await axios.post(`${API_URL}/admin/create-test`, testData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// View Results of a Student
export const adminGetStudentResults = async (studentId, token) => {
    return await axios.get(`${API_URL}/admin/student-results/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// View Results of a Subject
export const adminGetSubjectResults = async (subjectId, token) => {
    return await axios.get(`${API_URL}/admin/subject-results/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// View Overall Statistics
export const adminGetOverallStatistics = async (token) => {
    return await axios.get(`${API_URL}/admin/overall-statistics`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// =======================
// ✅ TEACHER API CALLS
// =======================

// Create a student account
export const teacherCreateStudent = async (studentData, token) => {
    return await axios.post(`${API_URL}/teacher/students`, studentData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Validate a student account
export const teacherValidateStudent = async (studentId, token) => {
    return await axios.post(`${API_URL}/teacher/students/validate/${studentId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Create a test (with questions and duration)
export const teacherCreateTest = async (testData, token) => {
    return await axios.post(`${API_URL}/teacher/tests`, testData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Create a subject
export const teacherCreateSubject = async (subjectData, token) => {
    return await axios.post(`${API_URL}/teacher/subjects`, subjectData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// View all student results
export const getTeacherResults = async (token) => {
    return await axios.get(`${API_URL}/teacher/results/students`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// View results by subject
export const getSubjectResults = async (subjectId, token) => {
    return await axios.get(`${API_URL}/teacher/results/subjects/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// View overall statistics
export const getTeacherStatistics = async (token) => {
    return await axios.get(`${API_URL}/teacher/statistics`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// =======================
// ✅ STUDENT API CALLS
// =======================
export const attendTest = async (testId, token) => axios.post(`${API_URL}/student/attend-test/${testId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const getStudentResults = async (studentId, token) => axios.get(`${API_URL}/student/results/${studentId}`, { headers: { Authorization: `Bearer ${token}` } });
export const getStudentStatistics = async (studentId, token) => axios.get(`${API_URL}/student/statistics/${studentId}`, { headers: { Authorization: `Bearer ${token}` } });
export const studentFetchTest = async (testId) => axios.get(`${API_URL}/student/test/${testId}`).then(res => res.data);
export const studnetSubmitTest = async (testId, answers) => axios.post(`${API_URL}/student/submit/${testId}`, { answers }).then(res => res.data);

// =======================
// ✅ GENERAL STATS API
// =======================
export const fetchStatistics = async () => {
    const response = await api.get('/statistics');
    return response.data;
};

export const fetchTest = async (testId) => {
    const response = await axios.get(`${API_URL}/student/test/${testId}`);
    return response.data;
};

export const submitTest = async (testId, answers) => {
    const response = await axios.post(`${API_URL}/student/submit/${testId}`, { answers });
    return response.data;
};

export const getAllTeachers = async () => {
    const response = await axios.get(`${API_URL}/admin/teachers`);
    return response.data;
};

export const getAllStudents = async () => {
    const response = await axios.get(`${API_URL}/admin/students`);
    return response.data;
};

export const getAllSubjects = async () => {
    const response = await axios.get(`${API_URL}/admin/subjects`);
    return response.data;
};

export const getAllTests = async () => {
    const response = await axios.get(`${API_URL}/admin/tests`);
    return response.data;
};

// ✅ Default export for generic GET/POST/PUT/DELETE (used in Dashboard)
export default api;
