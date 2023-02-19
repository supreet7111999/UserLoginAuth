const express=require("express");
require("./db/conn");
const crypto=require("crypto");
const port=process.env.PORT||3000;
const UserModel=require("./models/user");
const bcrypt=require("bcrypt");
const app=express();

const algorithm = 'aes-256-cbc';
 
const key = crypto.randomBytes(32);
 
const iv = crypto.randomBytes(16);
 
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
 
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
 
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
 
    return decrypted.toString();
}


app.use(express.json());
app.get("/",(_,res)=>{
    res.send("Welcome");
})
app.post("/register",async (req,res)=>{
     try{
        console.log(req.body);
        // if(!name || !)
        // const {name,email,phone,password}=req.body;
        let name=req.body.name;
        let email=req.body.email;
        let phone=req.body.name;
        let password=req.body.password;
        if(!name||!email||!phone||!password)
        {
            res.send({"status": "failed", "message": "Please enter all values"});
            return;
        }
        else{
        let encemail=encrypt(email);
        encemail=encemail.encryptedData;
        let encname=encrypt(name);
        encname=encname.encryptedData;
        console.log(encemail);
        const user=await UserModel.findOne({email:encemail});
        console.log(user);
        if(user)
        {
            res.send({ "status": "failed", "message": "Email already exists" });
        }
        else{
        let encphone=encrypt(phone);
        encphone=encphone.encryptedData;
        // console.log(encname);
        // console.log(encemail);
        // console.log(encphone);
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            email: encemail,
            name: encname,
            phone:encphone,
            password: hashPassword,
            accessToken:""
          })
        // console.log(hashPassword);  
        const x=await doc.save();
        console.log(x);
        res.status(201).send({"status":"success","message":"Registration Success"});
        }    }
     }catch(err){
        console.log(err);
        res.send({ "status": "failed", "message": "Unable to Register" });
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