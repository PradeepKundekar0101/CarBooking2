const mongoose=require("mongoose");
const connect=()=>{
    try{
        const local="mongodb://localhost:27017/carrental"
        mongoose.connect(local,{useUnifiedTopology: true, useNewUrlParser: true,},()=>{
            console.log("Connected to DB!");
        });
    }
    catch(e){
        console.log(e);
    }
}
module.exports=connect;