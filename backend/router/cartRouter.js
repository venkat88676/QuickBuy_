const express = require("express");
const { CartModel } = require("../model/cartModel");
const cartRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

cartRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token)
  jwt.verify(token, process.env.tokenSecret, async (err, decoded) => {
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

  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.tokenSecret);
    if (decoded) {
      const userId = decoded.userId;
      req.body.quantity = 1; // Set the default quantity to 1
      const cartItem = new CartModel({
        ...req.body,
        userId: userId // Set the userId in the cart item
      });

      await cartItem.save();
      res.status(201).json({ msg: "Added to your cart",error:false });
    } else {
      res.status(401).json({ msg: "Please log in",error:true });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message ,error:true});
  }
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

cartRouter.delete("/deleteAll/:id", async (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  try {
    await CartModel.deleteMany({ userId });
    res.send({ msg: `All Items from cart is Deleted of user:${userId} ` });
  } catch (err) {
    res.send(err);
  }
});

module.exports = { cartRouter };
