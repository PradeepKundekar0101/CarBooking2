const mongoose=require('mongoose');


const orderSchema = new mongoose.Schema({
    useremail:
    {
        type:String
    },
    carname:{
        type:String,
        
    },
    startdate:{
        type: String,
    },
    enddate:{
        type:String,
    },
    price:{
        type: Number
    }
    
},{collection:"orders"});

const order= new mongoose.model("order",orderSchema);
module.exports=order;