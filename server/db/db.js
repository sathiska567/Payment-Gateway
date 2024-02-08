const mongoose = require('mongoose');

const Mongo_url = process.env.MONGO_URL;

mongoose.connect(Mongo_url)

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection successfully");
})

