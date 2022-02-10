require("dotenv").config();
const router = require('express').Router();
const mongoose = require("mongoose");
const User = require('../models/user');

router.post('/:email', async (req, res) => {
  try {
    const { name, _id, email, file } = req.body

    const receiver = await User.findOne({ email: req.params.email });

    // console.log(receiver, 11)
    if (!receiver) {
      res.statusMessage = "No Such User Exists"
      return res.status(200).end();
    }


    receiver.received.push({
      name, _id: mongoose.Types.ObjectId(_id), email,
      Time: (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().getFullYear()
        + " ( " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
        + " )",
      link: `${process.env.APP_URL}files/${file}`
    })

    const saved = await receiver.save();
    // console.log(saved, 19)

    const sender = await User.findOne({ email: email });
    if (!sender) {
      res.statusMessage = "No Such User Exists"
      return res.status(200).end();
    }

    sender.sent.push({
      name: receiver.name, _id: receiver._id, email: receiver.email,
      Time: (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().getFullYear() + 
      " ( " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + 
      " )" ,
      link:`${process.env.APP_URL}files/${file}`
    })

    const saved1 = await sender.save();
    // console.log(saved1, 27)
    res.statusMessage = "File Sent Sccessfully"
    return res.status(200).end()


  } catch (err) {
    res.statusMessage = "Some Error Occured"
    return res.status(400).end();
  }
})

module.exports = router;