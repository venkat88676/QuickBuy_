const {ProModel}=require('../model/productModel')
const express=require('express')
const proRouter=express.Router();

proRouter.get('/',async(req,res)=>{
    try{
        let products=await ProModel.find();
        res.send(products)
    }catch(err){
        console.log(err)
    }
})

proRouter.post('/add',async(req,res)=>{
    const payload=req.body
    const product=new ProModel(payload)
    try{
        await product.save()
         res.send({"msg":"Product has been added"})
    }catch(err){
        res.send({"msg":err.message})
    }    
})

module.exports={proRouter}