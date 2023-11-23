const express = require('express');

const router = express.Router();
const {getAllProducts,testing,updateData,createCollection} = require("../controllers/products")

router.route("/").get(getAllProducts);
router.route("/update").get(updateData);
router.route("/create").post(createCollection);
//when route comes to /testing call testing
router.route("/testing").get(testing);

module.exports = router;