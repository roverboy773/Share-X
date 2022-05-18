const User = require('../models/user')
const mongoose=require('mongoose');
const passport=require('passport');
const url=require('url')

async function helper(req,res) {
    try {
        // console.log("sdsadasd")
        const user = await User.find({ email: req.user.emails[0].value })
        if (user.length) {
          
            res.redirect(url.format({
                pathname:"http://localhost:5500/public/index.html",
                query: {
                  '_id':user[0]._id+"",
                  'name':user[0].name,
                  'email':user[0].email
                 }
              }));
              return res.status(200).end();
        }
        
        let newuser = new User({
            name: req.user.displayName,
            email: req.user.emails[0].value,
        })
       
        const saved = await newuser.save();
        //  console.log(saved)
         
        if (saved) {
            console.log(saved._id)
            res.redirect(url.format({
                pathname:"http://localhost:5500/public/index.html",
                query:{
                    "_id":saved._id+"",
                    "name":saved.name,
                    "email":saved.email,
                }
            }))
            return res.status(200).end();
    }
        else console.log('not saved')
        //console.log(req.session)
       
    } catch (e) {
        console.log(e);
    }
}

module.exports = helper