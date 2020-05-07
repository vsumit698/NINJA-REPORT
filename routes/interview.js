const router = require('express').Router();

const interviewController = require('../controllers/interview');

// root is interview-list now 
//      route is - /user/interview-list/.....


// view all created interviews
router.get('/',interviewController.viewInterviewsList);

// add Interview
router.post('/add-interview',interviewController.addInterview);

// add Student to Interview
router.post('/add-student',interviewController.addStudentToInterview);

// view assigned students in interview
router.get('/student-list/:interviewId',interviewController.viewInterviewStudents);

//change Interview result status
router.post('/student-list/set-status/:resultId',interviewController.setStatus);


module.exports = router;