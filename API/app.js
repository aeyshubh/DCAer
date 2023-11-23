const express = require('express');
const bodyParser = require('body-parser');
const product_routes = require("./routes/products")
const connectDb = require("./db/connect");

const app = express();
require("dotenv").config();
const port = process.env.PORT ||5000;
app.get("/",(req,res)=>{
    res.send("Hi, i am Live")
})
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
app.use("/api/products",product_routes);

const start = async() =>{
try{
    await connectDb;
    app.listen(port,() =>{
        console.log("Connected to ",port);
        console.log(connectDb); 
    });

} catch(error){
    console.log(error);
} 
}

start();