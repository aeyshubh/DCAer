const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
    walletAddress:{type: String,required:true},
    asset1:{type: String,required:true},
    asset1Value:{type: Number,required:true},
    asset2:{type:String,required:true},
    timeDuration:{type:String,required:true}, // per hour
})

module.exports= mongoose.model('Attribute',modelSchema)