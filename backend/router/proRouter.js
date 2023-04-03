const {ProModel}=require('../model/productModel')
const express=require('express')
const proRouter=express.Router();

proRouter.get('/',async(req,res)=>{
    let {category,rating,name,page}=req.query
    console.log(category)
    let filter={}
    if(category){
        filter.category=category
    }
    if(rating){
        filter.rating={$gt:rating}
    }
    if(name){
        filter.name=new RegExp(name, 'i');
    }
    let skip
    if(page){
        skip=(page-1)*9
    }
    try{
        let products=await ProModel.find(filter).skip(skip).limit(9);
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
         res.status(200).send({"msg":"added"})
    }catch(err){
        res.status(400).send(err)
    }    
})

module.exports={proRouter}