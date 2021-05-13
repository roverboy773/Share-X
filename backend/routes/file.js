const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const File=require("../models/model");


let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"uploads/")
    },
    filename: (req,file,cb)=>{
        let uniqueName=`${Date.now()}-${Math.random(Math.random()*1e9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
}) 

const upload=multer({
    storage,
    limits:{fileSize:1000000*100}
}).single('myFile')


router.post("/",(req,res)=>{

  
//store file
  upload(req,res,async(err)=>{
      //validate request
    //   console.log(req.file);
       if(!req.file)
       return res.json({"message":"select a file"});
  
       if(err){
         return res.status(500).json({"error":err.message});
      }
       //store into database
       const file=new File({
           fileName:req.file.filename,
           path:req.file.path,
           size:req.file.size,
           uuid:uuidv4(),
       })

       const response=await file.save();
       console.log(process.env.APP_URL)
       return res.json({file:`${process.env.APP_URL}files/${response.uuid}`})
  })


//response
})

module.exports=router;