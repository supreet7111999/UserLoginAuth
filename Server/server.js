const express=require("express");
require("./db/conn");
const crypto=require("crypto");
const port=process.env.PORT||3000;
const UserModel=require("./models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const app=express();
const jwtSecret="jwtsecret12345678";
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

app.get("*",(_,res)=>{
    res.send("Welcome");
})
app.post("/register",async (req,res)=>{
     try{
        console.log(req.body);
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
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            email: encemail,
            name: encname,
            phone:encphone,
            password: hashPassword,
          })
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
    let email=req.body.email;
    let password=req.body.password;
    console.log(email);
    console.log(password);
    if(email==null || password==null)
    {
        res.send({"status":"error","message":"Please fill all details"});
        return ;
    }
    else{
        let encemail=encrypt(email);
        encemail=encemail.encryptedData;
        console.log(encemail);
        let user=await UserModel.findOne({email:encemail});
        if(user!=null)
        {
         const isMatch = await bcrypt.compare(password, user.password);
         if(!isMatch)
         {
            res.send({"status":"error","message":"Invalid Details"});
         }
         else{
            const name=decrypt(user.name);
            const phone=decrypt(user.phone);
            console.log(phone);
            const token = jwt.sign({ userID: user._id.toString() },jwtSecret, { expiresIn: '5d' });
            res.status(201).send({ "status": "success", "message": "Login Success", "token": token ,"name":name,"phone":phone});
         }
        }
        else{
            res.send({"status":"error","message":"Invalid Details"});
        }
    }
})
app.post("/update",async (req,res)=>{
   const email=req.body.email;
   const name=req.body.name;
   const phone=req.body.phone;
   console.log("1");
   try{
    if(!phone||!name)
    {
     res.send({"status":"error","message":"Enter all fields"});
     return ;
    }
    let encemail=encrypt(email);
    let encphone=encrypt(phone);
    let encname=encrypt(name);
    encemail=encemail.encryptedData;
    encname=encname.encryptedData;
    encphone=encphone.encryptedData;
    console.log("bj");
    console.log(encemail);
    await UserModel.findOneAndUpdate({'email':encemail},{$set:{'name':encname,'phone':encphone}});
    res.send({'status':'success','message':"updated"});
   }
   catch(err)
   {
     res.send({'status':'error','message':'Something error'});
   }

})
app.post("/changepass",async (req,res)=>{
    const {oldPass,newPass}=req.body;

    if(!oldPass||!newPass)
    {
        res.send({"status":"error","message":"Enter all fields"});
        return ;
    }
    let email=req.body.email;
    let encemail=encrypt(email);
    encemail=encemail.encryptedData;
    let user=await UserModel.findOne({'email':encemail});
    // let user=await UserModel.findOne({'email':'d3b94050bed3a16f22ef93e288965ea6'});
    if(user==null)
    {
        res.send({"status":"error","message":"Not a valid user"});
        return;
    }
    const isMatch = await bcrypt.compare(oldPass, user.password);
    if(isMatch)
    {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPass,salt);
        res.send({"status":"success","message":"password changed"});
    }
    else{
        res.send({"status":"error","message":"old password not matched"});
    }
})
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})