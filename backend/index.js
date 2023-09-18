const express=require("express");
const cors=require("cors")

const {connection} = require("./config/db");
const {userRouter}=require('./router/userRouter')
const {proRouter}=require('./router/proRouter')
const {cartRouter}=require('./router/cartRouter')
const {authenticate}=require('./middleware/authenticate')

require("dotenv").config()
const app=express();

app.use(cors())
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Basic route"})
})


app.use('/users',userRouter);
app.use('/products',proRouter)
app.use('/cart',authenticate,cartRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`server running at ${process.env.port}`)
    }catch(err){
        console.log(err)
    }
})
