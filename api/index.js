const express = require("express");

const router = express.Router();

const productsApi = require("./product/ProductRoutes");

router.use("/products", productsApi);

module.exports = router;
