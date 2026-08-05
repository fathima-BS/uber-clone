const { validationResult } = require("express-validator");
const userModel = require("../model/user.model");
const userService = require("../services/user.service");
const blackListTokenModel=require('../model/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);
  const user=await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword
  })
  const token=user.generateAuthToken();
  res.status(201).json({token,user})
};
module.exports.getUser=async (req,res) => {
    try {
        const users=await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:"failed to fetch users",error:error.message})
    } 
}
module.exports.loginUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const token=user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,user});
}

module.exports.getUserProfile=async (req,res) => {
     res.status(200).json(req.user);
}

module.exports.logoutUser=async (req,res) => {
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message:'logged out'}) 
}