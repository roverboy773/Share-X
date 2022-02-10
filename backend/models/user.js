const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({ 
   name:{
       type:String,
       required:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
   },
   sent:{
       type:Array,
   },
   received:{
       type:Array,
   }
 
},{timestamps:true})

module.exports= mongoose.model('user',userSchema);