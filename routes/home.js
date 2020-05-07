const router = require('express').Router();

const userRoute = require('./user');

const homeController = require('../controllers/homeController');


router.get('/',homeController.home);

router.get('/downloadCSV',homeController.downloadCSV)

router.use('/user',userRoute);

module.exports = router;