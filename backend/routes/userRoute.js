const express = require('express');
const router = express.Router();
const {userLogin,userSignup,userProfile}= require('../controllers/userController');
const {userAuth} = require('../middlewares/Auth');


//login route
router.post('/login',userLogin)

//signup
router.post('/signup',userSignup)

//middleware to check login
router.use(userAuth)
//user profile
router.get('/profile',userProfile)

module.exports = router