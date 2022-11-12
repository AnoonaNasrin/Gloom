const router = require("express").Router()
const { login, register, otpSend, otpVerify , sendEmailOtp, verifyEmail, changePassword ,checkError } = require("../controllers/authController")


router.post('/login', login)

router.post('/register', register)

router.post('/otp', otpSend)

router.post('/otpverify', otpVerify)

router.post('/sendemail', sendEmailOtp)

router.post('/emailverify',verifyEmail)

router.post('/changepassword',changePassword)

router.post('/checkerror' ,checkError)

module.exports = router; 