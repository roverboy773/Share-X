require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const File = require("../models/model");
const PDFMerger = require('pdf-merger-js');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    let uniqueName = `${Date.now()}-${Math.random(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName)
  }
})
// max size 100MB
// HEROKU MAX SIZE 512MB
const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 }
}).single('myFile')


router.post("/", (req, res) => {
  console.log(req.body)
  if (req.body.toBeMerge) {

    var merger = new PDFMerger();
    (async () => {
      let mergedFileName = ""
      for (let i = 0; i < req.body.data.length; i++) {
        mergedFileName += `${req.body.data[i]}-`
        merger.add('uploads/' + `${req.body.data[i]}`);
      }
      mergedFileName = mergedFileName.substring(0, mergedFileName.length - 1)

      await merger.save('uploads/' + mergedFileName + '.pdf'); //save under given name and reset the internal document

      const file = new File({
        fileName: mergedFileName + '.pdf',
        uuid: uuidv4(),
        path: `uploads/${mergedFileName}.pdf`,
      })

      const response = await file.save();

      return res.json({
        file: `${process.env.APP_URL}files/${response.uuid}`,
        resp: response
      })
    })();
  }
  //store file

  else if (req.body.convert) {
    const path = require('path');
    const fs = require('fs').promises;


    const libre = require('libreoffice-convert');
    libre.convertAsync = require('util').promisify(libre.convert);

    (async function fn() {
      const ext = req.body.convertTo
      const inputPath = path.join(__dirname, "../", req.body.data.resp.path);
      console.log(inputPath)
      const temp = req.body.data.resp.fileName.lastIndexOf('.')
      // console.log(req.body.data.resp.fileName.substring(0,temp))
      const outputPath = path.join(__dirname, "../", `uploads/${req.body.data.resp.fileName.substring(0, temp)}${ext}`);
       console.log(outputPath)
      // Read file
      const docxBuf = await fs.readFileSync(inputPath);

      // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
      let done = await libre.convertAsync(docxBuf, ext, undefined);

      // Here in done you have pdf file which you can save or transfer in another stream
     const finalConvert=await fs.writeFileSync (outputPath, done);
     console.log(finalConvert)
    })()


  }
  else {
    upload(req, res, async (err) => {
      //validate request

      if (!req.file)
        return res.json({ "message": "select a file" });

      if (err) {
        return res.status(500).json({ "error": err.message });
      }
      //store into database
      const file = new File({
        fileName: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        uuid: uuidv4(),
        file_owner: req.body.file_owner
      })

      const response = await file.save();

      return res.json({
        file: `${process.env.APP_URL}files/${response.uuid}`,
        resp: response
      })
    })
  }


})

module.exports = router;
