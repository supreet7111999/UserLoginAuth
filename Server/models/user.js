const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:{
       type:String,
       required:true
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    password:{
        type:String,
       required:true
    }
})

const User=mongoose.model("User",userSchema);

module.exports=User;