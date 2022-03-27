require("dotenv").config();
const mongoose=require("mongoose")
const router=require('express').Router();
const File=require('../models/model');

router.post('/',async(req,res)=>{
    const {file_id,cloud_URL}=req.body
    // console.log(file_id,cloud_URL)
    try{
    const file=await File.UpdateOne({_id:mongoose.Types.ObjectId(file_id)},{
     $set:{cloud_URL:cloud_URL}
    });
    // console.log(file)
    const doc = await File.findOne({_id:mongoose.Types.ObjectId(file_id)});
//    console.log(doc)
    // if(!file){
    //     res.statusMessage="No Such File Exists"
    //     return res.status(200).end();
    // }
    // const saved=await file.save()
    // console.log(saved)
    // if(saved){
    //     res.statusMessage="File Uploaded Successfully"
    //     return res.status(200).end();
    // }
    }catch(err){
            return res.send(err);
    }
})

module.exports=router;
