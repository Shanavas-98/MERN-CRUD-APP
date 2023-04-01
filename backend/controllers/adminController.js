require("dotenv").config();
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");
const User = require("../models/userModel")

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

const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json({users})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const createUser = async (req,res,next)=>{
    try{
        console.log(req.body);
        await User.signup(req.body);
        res.status(200).json({message:"user created successfully"})
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

const editUser = async (req,res,next)=>{
    try{

    }catch(err){
        res.status(400).json({error:err.message});
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        await User.findOneAndDelete({_id:req.params.id})
        res.status(200).json({message:"user deleted successfully"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = { adminLogin, adminSignup };