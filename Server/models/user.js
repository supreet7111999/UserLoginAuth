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
        type:String,
        required:true,
        min:10
    },
    password: { type: String, required: true, trim: true },
    accessToken:{
        type:String,
        // required:true
    }
})

const UserModel=mongoose.model("user",userSchema);

module.exports=UserModel;