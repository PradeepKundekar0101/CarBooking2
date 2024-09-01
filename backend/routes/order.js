const express= require("express");
const router= express.Router();
const order=require("../db/models/order");
const cors= require("cors");
router.use(cors());
router.use(express.json());
// Get All orders  -- Admin only
router.get("/allorders",async(req,res)=>{
    try {
       
       const orderres= await order.find({});
        return res.status(200).send({success:true,data:orderres});
    } catch (error) {
        return res.status(500).send({success:false,data:"failed to fetch details"});
    }
})
// Get Order of a user  -- User only
router.get("/:id",async(req,res)=>{
    try {
        const orderres= await order.find({userid:req.params.id});
         return res.status(200).send({success:true,data:orderres});
     } catch (error) {
         return res.status(404).send({success:false,data:"No orders Found"});
     }
})
// Add order  -- User only
router.post("/",async(req,res)=>{
    try {
        const {useremail,carname,startdate,enddate,price}= req.body;
        const newOrder= new order({
            useremail,carname,startdate,enddate,price
        });
        newOrder.save();
        return res.status(200).send({success:true,data:"Order Placed Successfully"});
    } catch (error) {
        return res.status(500).send({success:false,data:"Order Failed"});
    }
})

module.exports= router;