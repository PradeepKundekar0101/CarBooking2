const express=require("express");
const multer=require("multer");
const router=express.Router();
const car=require("../db/models/car");

const cors=require('cors');
const message = require("../db/models/message");

//Initializing Multer Storage:
const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../frontend/client/public/uploads/cars');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

//Initializing Multer Middleware:
const upload= multer({storage:Storage});
router.use(cors());
router.use(express.json());

router.get('/getallcars',async(req,res)=>{
    const cars= await car.find({});
    res.json(cars);
});

router.get('/getcar/type/:type',async(req,res)=>{
    const mycar= await car.find({cartype:req.params.type});
    res.send(mycar);
});

//Get a Single Car
router.get('/getcar/:id',async(req,res)=>{
    try {
        const mycar= await car.find({_id:req.params.id});
        res.send({success:true,data:mycar});
    } catch (error) {
        res.send({success:false,data:"Failed to Fetch"});
    }
});



//Create a Car
router.post('/addcar',upload.single('thumbnail'),async(req,res)=>{
    try{ 
        const newcar=new car({
            model:req.body.model,
            maker:req.body.maker,
            cartype:req.body.cartype,
            price:req.body.price,
            noofseats:req.body.noofseats,
            description:req.body.description,
            mileage:req.body.mileage,
            fuel:req.body.fuel,
            hp:req.body.hp,
            year:req.body.year,
            thumbnail:req.file.originalname,
        });
        
        const saved=await newcar.save();
        res.send({success:true,data:"Saved"});
    }
    catch(e){
        res.send({success:false,data:"Failed to Save"});
    }
    
});

//Update a Car
router.put('/updatecar/:_id',upload.single('thumbnail'),async(req,res)=>{
    try {
        const carId=req.params._id;
        const update= await car.findByIdAndUpdate({_id:carId},{
            model:req.body.model,
            maker:req.body.maker,
            cartype:req.body.cartype,
            price:req.body.price,
            noofseats:req.body.noofseats,
            description:req.body.description,
            mileage:req.body.mileage,
            fuel:req.body.fuel,
            hp:req.body.hp,
            year:req.body.year,
        });
        res.send({success:true}); 
    } catch (error) {
        res.send({success:false}); 
    }
});
router.patch('/updatecar/:_id',upload.single('thumbnail'),async(req,res)=>{
    try {
        const carId=req.params._id;
        const update= await car.findByIdAndUpdate({_id:carId},{
            booked:req.body.booked
        });
        res.send({success:true}); 
    } catch (error) {
        res.send({success:false}); 
    }
});

//Delete a Car
router.delete('/deletecar/:_id',upload.single('thumbail'),async(req,res)=>{
    try {
        const carId=req.params._id;
        const deletecar= await car.findByIdAndDelete({_id:carId});
        res.send({success:true});
    } catch (error) {
        res.send({success:false});
    }
})

//Contact Us Post
router.post('/contact',upload.single('thumbail'),async(req,res)=>{
    try{
        const data= new message({
            name:req.body.name,
            email:req.body.email,
            phonenumber:req.body.phonenumber,
            message:req.body.message,
        });
        const saved= await data.save();
        res.send({success:true,data:"Saved"});
    }
    catch(e){
        console.log(e)
        res.send({success:false,data:"Internal Server Error"});
    }
});

//Contact Us All Messages
router.get('/contact',upload.single('thumbail'),async(req,res)=>{
    try{
        const data= await message.find({});
        res.send({success:true,data});
    }
    catch(e){
        res.send({success:false,data:"Internal Server Error"});
    }
});



module.exports=router;