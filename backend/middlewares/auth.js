const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Admin = require('../models/adminModel')
const userAuth = async(req,res,next)=>{
    //verify user authentication
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id}=jwt.verify(token,process.env.SECRET_KEY)
        req.user=await User.findOne({_id}).select('_id')
        next()
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Request is not authorized"})
    }
}

const adminAuth = async(req,res,next)=>{
    //verify admin authentication
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id}=jwt.verify(token,process.env.SECRET_KEY)
        req.admin=await Admin.findOne({_id}).select('_id')
        next()
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Request is not authorized"})
    }
}

module.exports ={userAuth,adminAuth}