const router=require('express').Router();
const File=require("../models/model");


router.get("/:uuid",async(req,res)=>{
    try{
    const file=await File.findOne({uuid:req.params.uuid});
    if(!file){
      return res.render('download',{error:"File not Found"})
     }

      return res.render('download',{
          uuid:file.uuid,
          fileName:file.fileName,
          fileSize:file.size,
          downloadLink:`${process.env.APP_URL}files/download/${file.uuid}`          
      })
    }
    catch(err){
       return res.render('download')
    }
})

module.exports=router;