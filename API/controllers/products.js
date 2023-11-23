const Model = require("../model/model");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://sam:sam@cluster0.ernjoy2.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const getAllProducts = async (req, res) => {// send req as localhost:5000/api/products?walletAddress=gm
    try {
console.log(req.query);
// const data = "gm"        
const data = await Model.find(req.query);
        res.status(200).json({ data });

    } catch (error) {
        console.log("Error is", error);
    }
};

const updateData = async (req, res) => {
    try {
        const data = await Model.updateOne({ "walletAddress": "0x82a7A0828fa8EB902f0508620Ee305b08634318A" }, { "attack1": 1000 });
        res.status(200).json({ data });
    } catch (error) {
        console.log("Error is", error);
    }

}

const createCollection = async (req, res) => {
    try {
        console.log("Inside Create")
        const data = await Model.insertMany({
            walletAddress: req.body.walletAddress,
            asset1: req.body.asset1,
            asset1Value: req.body.asset1Value,
            asset2: req.body.asset2,
            timeDuration: req.body.timeDuration
        })
        res.status(200).json({ data });

    } catch (error) {
console.log(error)
    }
}

const testing = async (req, res) => {
    res.status(200).json({ msg: "I got testing" });
};
module.exports = { getAllProducts, testing, updateData, createCollection }
