const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String
    }
});
const usermodel = new mongoose.model('user',UserSchema);
module.exports = usermodel;