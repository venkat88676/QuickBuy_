const express=require("express")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

const {validate}=require("../middleware/validate")
const {UserModel}=require('../model/userModel')
const {passport}=require("../config/google.auth")
const userRouter=express.Router();
require("dotenv").config()

userRouter.get("/",async(req,res)=>{
    try{
        const user=await UserModel.find()
        res.send(user)
    }catch(err){
        res.send(err)
    }
})

userRouter.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user._id},process.env.tokenSecret)
                    res.status(200).send({"msg":"Login Successfully","token":token,"usedetails":user})
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

userRouter.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    // console.log(payload, id);
    try {
      await UserModel.findByIdAndUpdate(id, payload);
      let user= await UserModel.findOne({_id:id})
      res.status(200).send({ "msg": "user updated" ,user});
    } catch (err) {
      res.status(400).send(err);
    }
  });

userRouter.delete('/delete/:id',async(req,res)=>{
    let id=req.params.id;   
    try{
        await UserModel.findByIdAndDelete(id)
         res.status(200).send({success:true,error:false})
    }catch(err){
        res.status(400).send({success:false,error:true})
    }    
})

userRouter.get("/getdata", async(req,res)=>{
    try {
        let {_id}=req.query       
        let user=await UserModel.findOne({_id})
        let token=jwt.sign({userId:user._id},process.env.tokenSecret)
        res.send({"userdetails":user})
        
    } catch (error) {
        console.log(error)
    }
})

// ---------google auth--------

userRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

userRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("userroute",req.user)
    const user=req.user
    let token=jwt.sign({userId:user._id},process.env.tokenSecret)   
 
    res.send(`<script>
    window.location.href = "http://127.0.0.1:5500/frontend/index.html?userid=${user._id}&token=${token}";
  </script>`);
  });


module.exports={userRouter}