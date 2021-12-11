require("dotenv").config();
const express= require('express');
const app= express();
const port=process.env.PORT||5000;
const path=require('path');
const cors=require('cors');
const corsOptions ={
    origin:['http://localhost:3000','https://jolly-dubinsky-0429de.netlify.app','http://127.0.0.1:3000'], 

credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const db=require("./config/db")
db(); 

app.use(express.static('public'));
//cors


// app.use(express.static(''))
app.use(express.json())
//views
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs')

//routes
app.use('/api/file',require("./routes/file"));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


app.listen(port,()=>console.log("server running at "+port));
