const mongoose=require('mongoose');

const CarSchema=new mongoose.Schema({
    model:{
        type:"String",
    },
    maker:{
        type:"String"
    },
    cartype:{
        type:"String"
    },
    price:{
        type:"Number",
    },
    noofseats:{
        type:"Number",
    },
    description:{
        type:"String",
    },
    thumbnail:{
        type:"String",  
    },
    year:{
        type: "Date"
    },
    mileage:{
        type:"Number"
    },
    fuel:{
        type:"String"
    },
    hp:{
        type:'Number'
    },
    booked:{
        type:"Boolean",
        default: false
    }
},{collection:"cars"});

const car=new mongoose.model("car",CarSchema);
module.exports=car;