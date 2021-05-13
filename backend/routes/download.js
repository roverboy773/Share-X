const router=require('express').Router();
const File=require('../models/model');

router.get('/:uuid',async(req,res)=>{
    try{
    const file=await File.findOne({uuid:req.params.uuid});
    if(!file)
     return res.render('download',{error:'Link has been expired'});

     const filePath=`${__dirname}/../${file.path}`
     //console.log(filePath);
     res.download(filePath);
    }catch(err){
            return res.send(err);
    }
})

module.exports=router;
