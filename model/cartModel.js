const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String,
    rating:Number,
    quantity:Number,
    userId:String
},{
    versionKey:false
})

const CartModel=mongoose.model("cart",cartSchema)

module.exports={CartModel}