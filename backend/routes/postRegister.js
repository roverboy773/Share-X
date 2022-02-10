const User = require("../models/user");
const bcrypt = require('bcrypt');
const router=require('express').Router();
const passport = require('passport');

router.post("/",async(req,res)=>{
  
const { name, email, password } = req.body;
//validation
if (!name || !email || !password) {
    // req.flash('error', 'All fields are required!!!');
    // req.flash('name', name);
    // req.flash('email', email);
    res.statusMessage="Kindly Fill All Fields"
    return res.status(400).end();
}

const emailVerification = await User.find({ email: email });
if (emailVerification.length > 0) {
    // req.flash('error', 'Email already Registered');
    // req.flash('name', name);
    // req.flash('email', email);
    res.statusMessage='Email already Registered'
    return res.status(400).end();
}
//Hash password
const hashedPassword = await bcrypt.hash(password, 10)
//create user
const user = new User({
    name: name,
    email: email,
    password: hashedPassword
})

const saved = await user.save();
if (saved) {
    //auto login after registration
    saved.customerID = saved._id;
    await saved.save();
    res.statusMessage='User Added'
    return res.status(200).end();
} else {
    // req.flash('error', 'Something went wrong!')
    res.statusMessage='Something Went Wrong'
    return res.status(500).end();
}
})

module.exports=router;
