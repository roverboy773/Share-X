const NodeClam = require('clamscan')
const clamscanConfig=require('../config/clamscan')

const checkForVirus=async(req,res,next)=>{
    req.clamscan = await new NodeClam().init(clamscanConfig)
    next()
}
module.exports=checkForVirus