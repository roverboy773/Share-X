require("dotenv").config();
const express= require('express');
const app= express();
const port=process.env.PORT||5000;
const path=require('path');
const cors=require('cors');
const passport=require("passport")
const passportemail=require("./config/Passport_email")
const passportgoogle=require("./config/Passport_google")
const passportface=require("./config/Passport_face")
const helper=require('./config/SaveGoogleUsertoDB');

// const clamscanConfig=require('./config/clamscan')
// const NodeClam = require('clamscan')
// const ClamScan = new NodeClam().init(clamscanConfig)

const checkForVirus=require('./middleware/checkForVirus')

const corsOptions ={
    origin:['http://localhost:5500/','https://jolly-dubinsky-0429de.netlify.app/','https://zen-hoover-664ef4.netlify.app/','https://kind-babbage-ba1758.netlify.app/','http://127.0.0.1:3000','http://127.0.0.1:5500/'], 

credentials:true,            //access-control-allow-credentials:true
   
}
app.use(cors());
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
app.use('/register', require("./routes/postRegister"));
app.use('/sent_to',require("./routes/sent"))
app.use('/sent_files',require("./routes/sent_files"))
app.use('/received_files',require("./routes/received_files"))
app.use('/merge_files',require("./routes/file"))
app.use('/sendOTP',require("./routes/sendEmail"))
app.use('/updateUser',require("./routes/updateUser"))


//passport local auth
app.use('/login',require("./routes/loginEmail"))
  
//passport google auth 
app.get('/public/google', passportgoogle,
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/public/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/public/fail' }),(req,res)=>helper(req,res))

//passport facebook auth
app.get('/public/facebook', passportface,
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

app.get('/public/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/public/fail' }),(req,res)=>helper(req,res));


app.get("/",(req,res)=>{
  res.send("server running")
})
app.listen(port,()=>console.log("server running at "+port));
