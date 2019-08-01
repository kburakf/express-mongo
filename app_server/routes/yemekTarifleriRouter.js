// YEMEK TARİFLERİ KONTROL
const express = require("express")
const router = express.Router()
const control = require("../controller/tarifController")

router.get("/",control.veriGoster)
router.post("/",control.veriKaydet)

module.exports = router