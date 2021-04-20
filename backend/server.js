const express= require('express');
const app= express();
const port=process.env.PORT||3000;
const path=require('path');

const db=require("./config/db")
db();


app.use(express.json())
//views
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs')

//routes
app.use('/api/file',require("./routes/file"));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


app.listen(port,()=>console.log("server running at "+port));