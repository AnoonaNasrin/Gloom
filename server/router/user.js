const router = require("express").Router()
const { friendsCount, findUserProfile, upload, uploadImage, friendBlock, findBlock, requestUserImage } = require("../controllers/userController")

router.get('/totalfriends/:userId', friendsCount)
router.get('/userprofile/:userId', findUserProfile)
router.post('/uploadimg', uploadImage, upload)
router.get('/image/:userId', requestUserImage)
router.post('/block', friendBlock)
router.post('/findblock', findBlock)
module.exports = router;