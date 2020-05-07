const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/ninjaReport_db",{ useNewUrlParser: true ,useUnifiedTopology:true });

const db = mongoose.connection;

// checking if error occurs or not

db.on('error', console.error.bind(console,"error occured during connection"));

// if no errors occured while setup it will fire 'open' event once...

db.once('open',function(){
    console.log("database is successfully connected........");
});

module.exports = db;