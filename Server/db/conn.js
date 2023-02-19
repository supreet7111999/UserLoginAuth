const mongoose=require("mongoose");
// const url="mongodb+srv://root:root@cluster0.vcvx4oj.mongodb.net/?retryWrites=true&w=majority";
const url="mongodb+srv://root:root@cluster0.kzjvrgp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})