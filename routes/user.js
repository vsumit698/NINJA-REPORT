const router = require('express').Router();
const userController  = require('../controllers/userController');
const passport = require('passport');
// root is user now 
//      route is - /user/.....

router.get('/sign-up',userController.signUp); // displaying sign Up page

router.post('/create-user',userController.createUser);// used while sign up the user

router.get('/sign-in',userController.signIn); //displaying sign In page

// used while sign in the user
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),userController.createSession);

router.get('/forgot-password',userController.forgotPassword);

router.post('/setup-forgotpassword',userController.setupForgotPassword);

router.get('/sign-out',userController.deleteSession);

router.get('/reset-password',userController.resetPassword);// for reset password

router.post('/update-password',userController.updatePassword);
// for handling student-list route
router.use('/student-list',require('./student'));
// for handling interview-list route
router.use('/interview-list',require('./interview'));

module.exports = router;
