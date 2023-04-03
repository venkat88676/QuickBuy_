const express=require("express")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
const {validate}=require("../middleware/validate")

const {UserModel}=require('../model/userModel')
const userRouter=express.Router();

userRouter.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user._id},'masai')
                    res.status(200).send({"msg":"Login Successfully","token":token})
                }
                else res.status(400).send({"msg":"Wrong credentials"}) 
            })
        } 
        else{
            res.status(400).send({"msg":"Register First"})
        }
    }catch(err){
        res.status(400).send({msg:err.message})
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

module.exports={userRouter}