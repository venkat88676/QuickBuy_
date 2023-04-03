
const mongoose=require("mongoose")
const proSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String,
    rating:Number
},{
    versionKey:false
})

const ProModel=mongoose.model("Product",proSchema)

module.exports={ProModel}