const mongoose=require("mongoose");
// const url="mongodb+srv://root:root@cluster0.vcvx4oj.mongodb.net/?retryWrites=true&w=majority";
const url="mongodb://127.0.0.1:27017/user";
mongoose.connect(url).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})