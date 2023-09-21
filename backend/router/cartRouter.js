const express = require("express");
const { CartModel } = require("../model/cartModel");
const cartRouter = express.Router();
const jwt = require("jsonwebtoken");

cartRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token)
  jwt.verify(token, "masai", async (err, decoded) => {
    console.log(decoded)
    if (decoded) {
      let userId = decoded.userId;
      let notes = await CartModel.find({ userId });
      res.send(notes);
    } else {
      res.send({ msg: "Please Login" });
    }
  });
});

cartRouter.post("/create", async (req, res) => {
  
  // const token = req.headers.authorization;
  // jwt.verify(token, "masai", async (err, decoded) => {
  //   if (decoded) {
  //     let userId = decoded.userId;
  //     req.body.quantity=1
  //     const payload = req.body;
  //     const note = new CartModel(payload,userId);
  //     try {
  //       await note.save();
  //       res.send({ msg: "added" });
  //     } catch (err) {
  //       res.send({ msg: err.message });
  //     }
  //   } else {
  //     res.send({ msg: "Please Login" });
  //   }
  // });
});

cartRouter.patch('/update/:id',async(req,res)=>{
    const noteId=req.params.id
    const payload=req.body;
    try{
        await CartModel.findByIdAndUpdate({_id:noteId},payload)
         res.status(200).send({"msg":`Note with id:${noteId} has updated`})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    
})

cartRouter.delete("/delete/:id", async (req, res) => {
  const noteId = req.params.id;
  try {
    await CartModel.findByIdAndDelete({ _id: noteId });
    res.send({ msg: `Note with id:${noteId} has Deleted` });
  } catch (err) {
    res.send(err);
  }
});

module.exports = { cartRouter };
