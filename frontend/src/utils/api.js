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
    return await axios.post(`${API_URL}/auth/signup`, userData);
};

export const signIn = async (credentials) => {
    return await axios.post(`${API_URL}/auth/signin`, credentials);
};

// =======================
// ✅ ADMIN API CALLS
// =======================
export const createTeacher = async (teacherData, token) => {
    return await axios.post(`${API_URL}/admin/create-teacher`, teacherData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createStudent = async (studentData, token) => {
    return await axios.post(`${API_URL}/admin/create-student`, studentData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createSubject = async (subjectData, token) => {
    return await axios.post(`${API_URL}/admin/create-subject`, subjectData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createTest = async (testData, token) => {
    return await axios.post(`${API_URL}/admin/create-test`, testData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getResults = async (token) => {
    return await axios.get(`${API_URL}/admin/results`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// =======================
// ✅ TEACHER API CALLS
// =======================
export const teacherCreateStudent = async (studentData, token) => {
    return await axios.post(`${API_URL}/teacher/create-student`, studentData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const teacherCreateTest = async (testData, token) => {
    return await axios.post(`${API_URL}/teacher/create-test`, testData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getTeacherResults = async (token) => {
    return await axios.get(`${API_URL}/teacher/results`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};



// =======================
// ✅ STUDENT API CALLS
// =======================
export const attendTest = async (testId, token) => {
    return await axios.post(`${API_URL}/student/attend-test/${testId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getStudentResults = async (token) => {
    return await axios.get(`${API_URL}/student/results`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

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

// =======================
// ✅ TEACHER API CALLS
// =======================

export const getStudents = async () => {
    const response = await axios.get(`${API_URL}/teacher/students`);
    return response;
};

export const getTests = async () => {
    const response = await axios.get(`${API_URL}/teacher/tests`);
    return response;
};

export const createTest = async (testData) => {
    const response = await axios.post(`${API_URL}/teacher/create-test`, testData);
    return response;
};


// ✅ Default export for generic GET/POST/PUT/DELETE (used in Dashboard)
export default api;
