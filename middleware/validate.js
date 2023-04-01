const validate=(req,res,next)=>{
    let {name,email,password,gender,age,city}=req.body;
    if(name && email && password && gender && age && city){
        next();
    }
    else{
        res.status(400).send("Some field are Empty")
       
    }
}

module.exports={validate}