const express=require('express');
const cors=require("cors");
const app= express();
const PORT=process.env.PORT || 5003;
const connect=require("../backend/db/connect");
const adminRoute=require('../backend/routes/admin');
const userRoute=require("../backend/routes/user");
const orderRoute= require("../backend/routes/order");
connect();
app.use('/admin',adminRoute);
app.use('/user',userRoute);
app.use('/order',orderRoute);
app.use(cors());

app.use(express.json());
app.listen(PORT,()=>{
    console.log("Server Listening")
})