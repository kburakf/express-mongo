const express = require("express");
const router = express.Router();
const product = require("../controller/addProduct");

router.get("/", product.getProduct);
router.get("/addProduct/:name", product.getProduct);
router.post("/addProduct", product.createProduct);
router.get("/addProduct", product.getProductSchema);

module.exports = router;
