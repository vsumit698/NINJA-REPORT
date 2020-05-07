const router = require('express').Router();

const studentController = require('../controllers/student');

// root is student-list now 
//      route is - /user/student-list/.....


// view all created students
router.get('/',studentController.viewStudentsList);
// create student
router.post('/createStudent',studentController.createStudent);
module.exports = router;