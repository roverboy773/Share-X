const user=require('../models/user')
const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')

router.post('/',async(req,res)=>{
    try{
    const{email,password}=req.body

   const finduser=await user.findOne({email:email})
//    console.log(finduser)
   if(finduser){
        bcrypt.compare(password,finduser.password,(err,done)=>{
            if(done)
            return res.status(200).json({user_id:finduser._id,name:finduser.name})
            else
            return res.status(200).json({msg:'Wrong Credentials'})
        })
     
   }else{
       return res.statusCode(200).json({msg:'No such User Exists'})
   }
}catch(err){
    console.log(err)
}
})

module.exports=router