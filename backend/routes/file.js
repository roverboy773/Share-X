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
       return res.json({file:`${process.env.APP_URL}files/${response.uuid}`})
  })


//response
})

router.post('/send',async(req,res)=>{
  
    const {uuid,emailTo,emailFrom}=req.body;
    if(!uuid ||!emailTo ||!emailFrom){
        return res.status(422).send({error:"All feilds are required"});
    }
    //get data from database

    const file=await File.findOne({uuid:uuid});

    file.sender=emailFrom;
    file.receiver=emailTo;

    const response=await file.save();

    //email send
    const sendMail=require('../email');
    sendMail({
        from:emailFrom,
        to:emailTo,
        subject:'ShareX-File Sharing Made Ez',
        text:`${emailFrom} has shared a file with you`,
        html:require("../emailHTMLTemplate")({
            emailFrom:emailFrom,
            downloadLink:`${process.env.APP_URL}/files/${file.uuid}`,
            size:parseInt(file.size/1000)+'KB',
            expires:'24 hours'
        })
    })
    return res.send({success:"email sent"})
})

module.exports=router;