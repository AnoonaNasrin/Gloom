const router = require("express").Router()
const { friendsCount, findUserProfile, upload, uploadImage, friendBlock, findBlock, requestUserImage, frindList, blockCount, removePhoto } = require("../controllers/userController")

router.get('/totalfriends/:userId', friendsCount)
router.get('/userprofile/:userId', findUserProfile)
router.post('/uploadimg', uploadImage, upload)
router.get('/image/:userId', requestUserImage)
router.post('/remove', removePhoto)
router.post('/block', friendBlock)
router.post('/findblock', findBlock)
router.get('/friendlist/:userId', frindList)
router.get('/blockcount/:userId', blockCount)
module.exports = router;