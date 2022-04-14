const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const userFound = await user.findOneAndUpdate({ email: email }, { password: hashedPassword }, { returnNewDocument: true })
        if (userFound)
            return res.status(200).json({ msg: 'Password Changed Successfully' })
         else return res.status(300).json({msg:'Some Error Occurred'})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router