// const NodeClam = require('clamscan')
// const clamscanConfig=require('../config/clamscan')

// const checkForVirus=async(req,res,next)=>{
//     req.clamscan = await new NodeClam().init(clamscanConfig)

//     async function scanFile(filePath) {
//         try {
//             const clamscan = await ClamScan;
//             const { is_infected, viruses } = await clamscan.scan_file(filePath);
    
//             if (is_infected) {
//                 console.log(`The file is INFECTED with ${viruses}`);
//                 throw new Error('ERR_FILE_SCAN_INFECTED');
//             } else {
//                 return 'CLEAN';
//             }
//         } catch (err) {
//             throw new Error(err);
//         }
//       }
    
    
//       function start() {
//         return scanFile('/dodgyfile.rtf');
//       }
      
//       // Call start
//       (async() => {    
    
//         try{
//         await start();
//         }
//         catch(err){
//             console.log("error: ",err);
//         }    
        
//       })();
    
//     next()
// }
// module.exports=checkForVirus