const express = require("express");
const router = express.Router();
const control = require("../controller/jsonController");

router.get("/", control.veriGoster);
router.post("/", control.veriKaydet);
router.post("/albums", control.photos);
router.get("/albums", control.photosShow);
router.get("/albumsdelete/:id", control.delUser);

module.exports = router;
