// YEMEK TARİFLERİ KONTROL
const express = require("express")
const router = express.Router()
const control = require("../controller/tarifController")

router.get("/",control.veriGoster)
router.post("/",control.veriKaydet)
router.post("/albums",control.photos)
router.get("/albums",control.photosShow)
router.get("albums/:id",control.delUser)

module.exports = router