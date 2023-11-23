
// Importing required libraries 
const abi = require("./abi");
const cron = require("node-cron"); 
const express = require("express"); 
const axios = require("axios"); 
const ethers = require("ethers")
app = express(); // Initializing app 

const contract_address ="0x3B04EFf99792d8d299E798Aa15ead9b8bB77b344";
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai");
const your_private_key_string="1b4ef2764fb0b762512aca9558a76db21db34c80b549e782e4ef8018a831dce2";
const signer = new ethers.Wallet(your_private_key_string, provider);
const contractObj = new ethers.Contract(contract_address,abi,signer);

//console.log(abi);
// Creating a cron job which runs on every 10 second 
 cron.schedule("* */2 * * * *", async function() { 
    console.log("-----Running DCA-------");

     axios({ 
        method: 'get',
        url: `https://dcaer-api-production.up.railway.app/api/products`,
        responseType: 'json'
      }).then(async function (response) {
            for(let i=0;i<response.data.data.length;i++){
                try{
                        await contractObj.request(response.data.data[i].walletAddress).then((response)=>{console.log("Response :"+ JSON.stringify(response))})
            }catch(error){
                    console.log("Error is :"+error);
                }
            }
        });

 } );
  
app.listen(3000); 