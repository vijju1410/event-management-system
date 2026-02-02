const mongoose=require("mongoose")

const register = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
     email:{
        required:true,
        type:String,
        unique:true
    },
     password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user"],
        default:"user"
    }
})
module.exports=mongoose.model("register",register)