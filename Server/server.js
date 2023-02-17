const express=require("express");
require("./db/conn");
const port=process.env.PORT||3000;
const User=require("./models/user");
const app=express();


app.use(express.json());
app.get("/",(_,res)=>{
    res.send("Welcome");
})
app.post("/register",async (req,res)=>{
     try{
        console.log(req.body);
            
     }catch(err){
        res.status(500).send(err);
     }
})
app.post("/login",async (req,res)=>{

})
app.post("/update",(req,res)=>{

})
app.post("/changepass",(req,res)=>{

})
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})