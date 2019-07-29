const express = require("express")
const router = express.Router()
const signController = require("../controller/signupController")

router.get('/',signController.signupGet);
router.post("/",signController.signupPost)

module.exports = router