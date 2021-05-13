require("dotenv").config();
const mongoose=require("mongoose");

function connectDB(){
mongoose.connect("mongodb+srv://roverboy:GIhBsqQ6FwG5X43R@cluster0.kjtew.mongodb.net/file_sharing_app?retryWrites=true&w=majority",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})
.then(()=>console.log("db connection successful"))
.catch((err)=>console.log(err));
}

module.exports=connectDB;
