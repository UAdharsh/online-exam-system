# Online Exam Management System

## Overview
The Online Exam Management System is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows for the management of online exams with three main user roles: Admin, Teacher, and Student. Each role has specific functionalities to facilitate the creation, management, and participation in online tests.

## Features

### Admin Features
- Creation of Teacher and Student accounts
- Validation of accounts created through the signup page
- Creation of different subjects
- Creation of online tests
- View results of each student
- View results of each subject, including the number of tests conducted by each teacher
- View overall statistics of results from online exams

### Teacher Features
- Creation of Student accounts
- Validation of Student accounts created via the signup page
- Creation of different subjects
- Creation of online tests
- View results of each student
- View results of each subject in a separate view
- View overall statistics of results from online exams

### Student Features
- Access to attend tests
- View results of tests taken
- View statistics of their performance

## Pages
- Signin Page
- Signup Page
- Online Test Creation Page
- Teacher Creation Page (for Admin)
- Student Creation Page (for Admin and Teacher)
- Subject Creation Page
- Home Page (to view all results in tabular or graph form)
- Online Test Interface
- Validation Page

## Extra Features
- Students cannot switch tabs during an exam; if they attempt to switch tabs more than twice, the exam will be automatically submitted.
- Real-time monitoring of exams for Admins and Teachers to track student activity during tests.
- Teachers can also attend tests to view the student experience.

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MongoDB connection in `backend/config/db.js`.
4. Start the server:
   ```
   node server.js
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage
- Access the application through your web browser at `http://localhost:3000`.
- Use the Admin account to create Teacher and Student accounts, manage subjects, and create tests.
- Teachers can create Student accounts and tests, and view results.
- Students can sign up, attend tests, and view their results.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.