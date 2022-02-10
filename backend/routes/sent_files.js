require("dotenv").config();
const router=require('express').Router();
const User=require('../models/user');

router.get('/:id',async(req,res)=>{
    try{
    const user=await User.findOne({_id:req.params.id});
    if(!user){
        res.statusMessage="No Such User Exists"
        return res.status(200);
    }
    
     return res.json({sent_files:user.sent});
    }catch(err){
            return res.send(err);
    }
})

module.exports=router;
