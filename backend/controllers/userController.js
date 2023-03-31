require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const createToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

//login user
const userLogin = async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createToken(user._id);
    res.status(200).json({ email:user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//signup user
const userSignup = async (req, res, next) => {
  try {
    const user = await User.signup(req.body);
    //create a jwt token
    const token = createToken(user._id);

    res.status(200).json({ email:user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const userProfile = async(req,res,next)=>{
  try{
    const userId=req.params.id;
    const user = await User.findById({_id:userId})
    if(!user){
      throw Error("User not found!")
    }
    if(user){
      res.status(200).json(user)
    }
  }catch(err){
    res.status(400).json({error: err.message})
  }
}

const updateProfile=async(req,res,next)=>{
  try{
    
  }catch(err){
    res.status(400).json({error:err.message})
  }
}

module.exports = { userLogin, userSignup,userProfile,updateProfile };