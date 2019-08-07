// LOGIN CONTROLLER

const express = require("express")
const router = express.Router()
const control = require("../controller/loginController")
const verifyToken = require("../middleware/verify-token")

router.get('/',control.loginGet);
router.post("/kullanicilarListesi",control.authPost)
router.get("/kullanicilarListesi",control.usersList)
router.post("/",control.authPost)
router.get("/kullanicisil/:username",control.delUser)

// CHAT CONTROLLER

const chat = require("../controller/chatController")
router.post("/chat",chat.postChat)
router.get("/chat",chat.getChat)

module.exports = router