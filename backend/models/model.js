const mongoose=require("mongoose");

const fileSchema=new mongoose.Schema({
    fileName:{type:String,required:true},
    path:{type:String,required:true},
    size:{type:Number,required:true},
    uuid:{type:String,required:true}, 
<<<<<<< HEAD
    file_owner:{type:mongoose.Schema.Types.ObjectId},
    expire_at:{type:Date,default:Date.now(),expires:86400}
},
{timestamps:true})
=======
    sender:{type:String,required:false},
    receiver:{type:String,required:false},
   expire_at:{type:Date,default:Date.now(),expires:86400}

},{timestamps:true})
>>>>>>> e11803599cdf2ea0a587435c7c2e7b6dcd24ab00

module.exports=mongoose.model("file",fileSchema)
