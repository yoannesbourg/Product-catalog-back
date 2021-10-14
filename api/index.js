const express = require("express");

const router = express.Router();

const productsApi = require("./product/ProductRoutes");
const awsApi = require("./aws/AwsRoutes");

router.use("/products", productsApi);
router.use("/aws", awsApi);

module.exports = router;
