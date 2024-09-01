const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    fname:
    {
        type:"String",
        lowercase:true
    },
    lname:{
        type:"String",
        lowercase:true
    },
    phonenumber:{
        type:"String",
    },
    email:{
        type:"String",
        lowercase:true
    },
    password:{
        type:"String",
        lowercase:true
    },
    gender:{
        type:"String"
    },
    orders:{
        type: "Array"
    },
    wishlist:{
        type:"Array"
    }
},{collection:"users"});

const user= new mongoose.model("user",userSchema);
module.exports=user;