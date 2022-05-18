require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const File = require("../models/model");
const PDFMerger = require("pdf-merger-js");
const fs=require('fs')
var zip = require('express-zip');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let uniqueName = `${Date.now()}-${Math.random(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
// max size 100MB
// HEROKU MAX SIZE 512MB
const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("myFile");

router.post("/", (req, res) => {
  // console.log(req.body);
  if (req.body.toBeMerge) {
    console.log(req.body.data)
    var merger = new PDFMerger();
    (async () => {
      let mergedFileName = "";
      for (let i = 0; i < req.body.data.length; i++) {
        if(req.body.data[i]!=null){
        mergedFileName += `${req.body.data[i]}-`;
        merger.add("uploads/" + `${req.body.data[i]}`);
        }
      }
      mergedFileName = mergedFileName.substring(0, mergedFileName.length - 1);

      await merger.save("uploads/" + mergedFileName + ".pdf"); //save under given name and reset the internal document

      const file = new File({
        fileName: mergedFileName + ".pdf",
        uuid: uuidv4(),
        path: `uploads/${mergedFileName}.pdf`,
      });

      const response = await file.save();

      return res.json({
        file: `${process.env.APP_URL}files/${response.uuid}`,
        resp: response,
      });
    })();
  }

  else if(req.body.toBeSplit){

    var convertapi = require('convertapi')(process.env.CONVERTAPISECRET);
    // console.log(req.body)
    convertapi.convert('split', {
      File: path.join(__dirname,`../uploads/${req.body.data}`)
      }, 'pdf')
      .then(function(result) {
        result.saveFiles(path.join(__dirname,`../uploads/`));
    }).then(()=>{
      try{
      let files=[]
      let pat=path.join(__dirname,'/../uploads/',req.body.data);
      let i=1;
         while(fs.existsSync(pat)){
           console.log(pat)
          files.push({ path : pat, name : `File-${i}`})
          i++;
          if(i==2){
          pat=pat.replace('.pdf',`-${i}.pdf`);
          }else if(i>2)
          pat=pat.replace(`-${i-1}.pdf`,`-${i}.pdf`)

          // console.log(files)
         }
        res.zip(files)
      }catch(e){
        console.log('error',e)
      }
    });
    return;
  }
   
  //store file
  else if (req.body.convert) {
  
    var convertapi = require('convertapi')(process.env.CONVERTAPISECRET);

    const ext = req.body.convertTo;

    // console.log(path.join(__dirname,`../${req.body.data.resp.path}`))
    convertapi.convert(ext, { File:path.join(__dirname,`../${req.body.data.resp.path}` )})
    .then(function(result) {
      // get converted file url'
      // console.log("Converted file url: " + result.file.url);
      const temp1 = req.body.data.resp.path.lastIndexOf(".");

      // save to file
      // console.log(path.join(__dirname,`../${req.body.data.resp.path.substring(0,temp1)}.pdf`))
      return result.file.save(path.join(__dirname,`../${req.body.data.resp.path.substring(0,temp1)}.${ext}`));
    })
    .then(async function(file) {
      // console.log("File saved: " + file);
      const temp1 = req.body.data.resp.path.lastIndexOf(".");
      const newfile = new File({
        fileName: `${`${req.body.data.resp.path.substring(0,temp1)}.${ext}`.replace('uploads/','')}`,
        uuid: uuidv4(),
        path: `${req.body.data.resp.path.substring(0,temp1)}.${ext}`,
      });

      const response = await newfile.save();

      return res.status(200).json({
        file: `${process.env.APP_URL}files/${response.uuid}`,
        resp: response,
        msg:'File Successfully Converted'
      });
    })
    .catch(function(e) {
      console.error(e.toString());
    });
  } else {
    upload(req, res, async (err) => {
      //validate request
      if (!req.file) return res.json({ message: "select a file" });

      if (err) {
        return res.status(500).json({ error: err.message });
      }
      //store into database
      const file = new File({
        fileName: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        uuid: uuidv4(),
        file_owner: req.body.file_owner,
      });

      const response = await file.save();

      return res.json({
        file: `${process.env.APP_URL}files/${response.uuid}`,
        resp: response,
      });
    });
  }
});

module.exports = router;
