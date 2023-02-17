const express=require("express");
require("./db/conn");
const port=process.env.PORT||3000;
const User=require("./models/user");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:false, limit:'50mb'}));
app.get("/",(_,res)=>{
    res.send("Welcome");
})
app.post("/register",async (req,res)=>{
     try{
        console.log(req.body);
       res.send(req.body);
     }catch(err){
        res.status(500).send(err);
     }
})
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})