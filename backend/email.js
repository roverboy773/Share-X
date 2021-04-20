const nm=require("nodemailer");

async function sendMail({from,to,subject,text,html}){
   
    const tranporter=nm.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }

    })

    const send=await tranporter.sendMail({
            from:`ShareX <${from}>`,
            to:to,
            subject:subject,
            text:text,
            html:html
        })
        console.log(send);
}

module.exports=sendMail;