const mongoose=require('mongoose');

const messageSchema = new mongoose.Schema({
    name:
    {
        type:"String",
        lowercase:true
    },
    email:{
        type:"String",
        lowercase:true
    },
    phonenumber:{
        type:"String",
    },
    message:{
        type:"String"
    },
    read:{
        type: Boolean,
        default: false
    }
},{collection:"messages"});

const message= new mongoose.model("message",messageSchema);
module.exports=message;