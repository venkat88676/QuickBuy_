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
    let skip=0,limit=0
    if(page){
        skip=(page-1)*9;
        limit=9
    }
    try{
        let products=await ProModel.find(filter).skip(skip).limit(limit);
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

proRouter.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    console.log(payload, id);
    try {
      await ProModel.findByIdAndUpdate(id, payload);
      res.status(200).send({ "msg": "product updated" });
    } catch (err) {
      res.status(400).send(err);
    }
  });

proRouter.delete('/:id',async(req,res)=>{
    let id=req.params.id;
   
    try{
        await ProModel.findByIdAndDelete(id)
         res.status(200).send({"msg":"product deleted "})
    }catch(err){
        res.status(400).send(err)
    }    
})

module.exports={proRouter}