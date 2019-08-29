var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

var express = require('express');
var router = express.Router();


//create category
router.post('/sendemail', function (req, res, next) {

    var transporter = nodemailer.createTransport(smtpTransport({
        host : "mail.deliciasdelcampohym.com",
        port: 587,
        auth: {
            user : "alqueriametro@deliciasdelcampohym.com",
            pass : "deli2014"
        },
        // here it goes
        tls: {rejectUnauthorized: false},
        debug:true
    }));
    
    const mailOptions = {
        from: 'alqueriametro@deliciasdelcampohym.com', // sender address
        to: 'cesarleandromayorga7@gmail.com', // list of receivers
        subject: 'prueba', // Subject line
        html: '<p>esto es una prueba</p>'// plain text body
      };
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    
  })

  module.exports = router;

