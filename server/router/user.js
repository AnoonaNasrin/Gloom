const router = require("express").Router()
const { friendsCount, findUserProfile, upload, uploadImage, friendBlock, findBlock } = require("../controllers/userController")

router.get('/totalfriends/:userId', friendsCount)
router.get('/userprofile/:userId', findUserProfile)
router.post('/upload', uploadImage, upload)
router.post('/block', friendBlock)
router.post('/findblock', findBlock)
module.exports = router;