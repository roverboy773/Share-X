require("dotenv").config();
const mongoose=require("mongoose");

function connectDB(){
mongoose.connect(process.env.DB,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})
.then(()=>console.log("db connection successful"))
.catch((err)=>console.log(err));
}

module.exports=connectDB;
