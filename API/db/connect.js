
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://sam:sam@cluster0.ernjoy2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log(`Uri is ${uri}`);
    await mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) ;
    // Send a ping to confirm a successful connection
}catch(error){
    console.log(error);
} 
}
module.export = connect;
