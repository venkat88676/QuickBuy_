const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    rating:{type:Number,required:true},
    quantity:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
},{
    versionKey:false
})

const CartModel=mongoose.model("cart",cartSchema)

module.exports={CartModel}