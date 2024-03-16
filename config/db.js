require("dotenv").config();
const mongoose=require("mongoose");

function connectDB(){
mongoose.connect("mongodb+srv://roverboy:sharmasharma1999@cluster0.amgypzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})
.then(()=>console.log("db connection successful"))
.catch((err)=>console.log(err));
}

module.exports=connectDB;

