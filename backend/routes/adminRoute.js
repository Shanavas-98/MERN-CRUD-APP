const express = require('express');
const router = express.Router();
const {adminLogin,adminSignup} = require("../controllers/adminController")
const {adminAuth} = require('../middlewares/auth')

//login route
router.post('/login',adminLogin)

//signup
router.post('/signup',adminSignup)

//check login middleware
router.use(adminAuth)

module.exports = router