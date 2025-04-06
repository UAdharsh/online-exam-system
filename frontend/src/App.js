import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TestCreation from './components/TestCreation';
import SubjectCreation from './components/SubjectCreation';
import ValidationPage from './components/ValidationPage';
import TestInterface from './components/TestInterface';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/teacher" component={TeacherPage} />
          <Route path="/student" component={StudentPage} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/test-creation" component={TestCreation} />
          <Route path="/subject-creation" component={SubjectCreation} />
          <Route path="/validation" component={ValidationPage} />
          <Route path="/test/:id" component={TestInterface} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/teacher-dashboard" component={TeacherDashboard} />
          <Route path="/student-dashboard" component={StudentDashboard} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;