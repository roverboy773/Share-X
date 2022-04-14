const express=require('express')
const Router=express.Router()
const nodemailer=require('nodemailer')

const transport=nodemailer.createTransport({
    service:"hotmail",
    auth:{
    user:"ps9395@outlook.com",
     pass:process.env.EMAILPASSWORD
    }
})


Router.post('/',(req,res)=>{
    
    const {emailID,mode}=req.body
    
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    
    const options={
        from:'ps9395@outlook.com',
        to:emailID,
        subject:`OTP for ${mode}`,
        text:`Your OTP for your ShareX ${mode} is ${OTP}`
    }
    transport.sendMail(options,(err,done)=>{
        if(err){
        console.log(err)
        return
      }
    //   console.log("sent:",done.response)
    return res.status(200).json({msg:'OTP has been Sent Successfully',OTP:OTP})
    })
})

module.exports=Router