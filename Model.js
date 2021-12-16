const mongoose = require('mongoose');


const logs = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, require: true},
});

module.exports = mongoose.model('Logs', logs);