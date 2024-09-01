const express=require("express");

const user=require("../db/models/user");
const cors=require("cors");
const router= express.Router();

const jwt=require('jsonwebtoken');

router.use(cors());
router.use(express.json());

//Get All the Users
router.get("/allusers",async(req,res)=>{
    try {
        const users = await user.find({});
        res.send({success:true,data:users});
        
    } catch (error) {
        res.send({success:false,data:"Internal Server Error"});
    }
});
router.get("/:id",async(req,res)=>{
    const data= await user.findById(req.params.id);
    res.send({data});
});

// router.update("/:id",()=>{

// });
// router.delete("/:id",()=>{

// });
router.post("/register",async(req,res)=>{
   
    try {
        const {fname,lname,phonenumber,email,password,gender}=req.body;
        const emailExist= await user.findOne({email:req.body.email});
        const phoneExist= await user.findOne({phonenumber:req.body.phonenumber});
        if(emailExist) res.send({success:false,message:"Email Already Exists"});
        else if(phoneExist) res.send({success:false,message:"Phone number already exists"});
        else{
            const newuser= new user({
                fname,
                lname,
                phonenumber,
                email,
                password,
                gender
            });
            newuser.save();
            res.send({success:true,message:"Account created successfully"});    
            }
    } catch (error) {
        res.status(500).send({succes:false,message:"Internal Server Error"});
    }
});
router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const emailFound= await user.findOne({email});
        if(!emailFound || password!=emailFound.password)
        {
            return res.send({success:false,message:"Invalid Credentials"});
        }
        const payload={
            id:emailFound._id
        }
        const token= await jwt.sign(payload,"secret1234")
        return res.send({success:true,token:token});
       
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"Internal Server Error"});
    }
    
})

router.put('/update/:_id',async(req,res)=>{
    try {
        const id=req.params._id;
        const myUser= await user.findById(id);
        const emailExist = await user.findOne({email:req.body.email});
        const phoneExist = await user.findOne({phonenumber:req.body.phonenumber});
        if(emailExist)
        {
            if(emailExist.email!=myUser.email)
            return res.send({success:false,data:"Email Already taken"});
        }
        if(phoneExist)
        {
            if(phoneExist.phonenumber!=myUser.phonenumber)
            return res.send({success:false,data:"Phone Number Already taken"});
        }

        const update= await user.findByIdAndUpdate({_id:id},{
            fname:req.body.fname,
            lname:req.body.lname,
            phonenumber:req.body.phonenumber,
            email:req.body.email
        });

        res.send({success:true}); 
    } catch (error) {
        res.send({success:false}); 
    }
})
module.exports=router;