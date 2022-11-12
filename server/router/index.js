const router = require("express").Router()
const authRouter = require("./auth")
const userRouter = require("./user")

router.get('/home', (req, res) => {
    res.send("home screen")
})

router.use('/',authRouter)

router.use('/',userRouter)

module.exports = router;