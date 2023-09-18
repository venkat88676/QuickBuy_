const express=require("express")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

const {validate}=require("../middleware/validate")
const {UserModel}=require('../model/userModel')
const {passport}=require("../config/google.auth")
const userRouter=express.Router();

userRouter.get("/",(req,res)=>{
    res.send("user route")
})

userRouter.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user._id},'masai')
                    res.status(200).send({"msg":"Login Successfully","token":token,"username":user.name})
                }
                else res.status(400).send({"msg":"Wrong credentials"}) 
            })
        } 
        else{
            res.status(400).send({"msg":"Register First"})
        }
    }catch(err){
        res.status(400).send({msg:err.message+"hello"})
    }
})

userRouter.post('/register',validate,async(req,res)=>{
    try{
        const {name,email,password,gender,age,city}=req.body;
        bcrypt.hash(password,5,async(err,hash)=>{   
                if(err){
                    res.send({"msg":err.message})
                }  
                else{
                    const user= new UserModel({name,email,password:hash,gender,age,city})
                    await user.save();
                    res.status(200).send({msg:"Registered Successfully"})       
                }    
        })    
    }catch(err){
        res.status(400).send({msg:err.message})
    }
})

// ---------google auth--------

userRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

userRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    let token=jwt.sign({userId:req.user._id},'masai')
    res.status(200).send({"msg":"Login Successfully","token":token,"user":res.user})   
  });


module.exports={userRouter}