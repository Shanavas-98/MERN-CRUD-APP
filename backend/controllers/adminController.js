require("dotenv").config();
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");

const createToken = (adminId) => {
  return jwt.sign({ _id: adminId }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

//login admin
const adminLogin = async (req, res, next) => {
    try{
        const admin = await Admin.login(req.body);
        const token = createToken(admin._id);
        res.status(200).json({email:admin.email,token});
    }catch(err){
        res.status(400).json({error:err.message})
    }
};

//signup admin
const adminSignup = async (req, res, next) => {
    try {
        const admin = await Admin.signup(req.body);
        const token = createToken(admin._id);
        res.status(200).json({email:admin.email,token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
};

module.exports = { adminLogin, adminSignup };