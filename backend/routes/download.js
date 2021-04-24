const router=require('express').Router();
const File=require('../models/model');

router.get('/:uuid',async(req,res)=>{
    try{
    const file=await File.findOne({uuid:req.params.uuid});
    if(!file)
     return res.render('download',{error:'Link has been expired'});

     const response = await file.save();
     const filePath=`${__dirname}/../${file.path}`
     console.log(filepath);
     res.download(filepath);
    }catch(err){
            return res.send("error");
    }
})

module.exports=router;
