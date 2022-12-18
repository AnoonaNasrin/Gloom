const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const config = require("../config/app")
const { doSms, otpVerify } = require("../otp/otp")
const { otp: randomOtp, transporter } = require("../otp/email")
const emailTemplate = require("../view/otpTemplate")
const otpModel = require("../models/otpModel")
const otp = require("../otp/otp")


exports.login = async (req, res) => {

    const { email, password } = req.body

    try {
        const secret = crypto.randomBytes(64).toString("hex")

        //find user//
        const user = await userModel.findOne({ email: email }).lean()
        console.log(user);
        //check if user find//
        if (!user) return res.json({ message: "user not found", status: false })

        //check if password matches//
        if (!bcrypt.compareSync(password, user.password)) return res.json({ message: "Incorrect password", status: false }) // 401 unauthorized //

        //generate auth token //
        const userwithtoken = generateToken(user)
        return res.send(userwithtoken)

    } catch (e) {
        return res.json({ message: e.message, status: false })
    }
}

exports.register = async (req, res) => {
    try {

        //Hashing Password//
        const password = await bcrypt.hash(req.body.password, 10)
        req.body.password = password

        //Create user//
        const user = await userModel.create(req.body)
        const newUser = { ...user._doc }
        const userwithtoken = generateToken(newUser)
        return res.send(userwithtoken)
    } catch (e) {
        return res.json({ message: e.message, status: false })
    }
}

exports.checkError = async (req, res) => {
    //Email validating//
    const sameEmail = await userModel.findOne({ email: req.body.email })
    if (sameEmail) return res.json({ message: "Already existing email", status: false })

    //Number validating//
    const sameNumber = await userModel.findOne({ number: req.body.number })
    if (sameNumber) return res.json({ message: "Already existing number", status: false })

    res.json({ message: "No error", status: true })
}

const generateToken = (user) => {
    delete user.password
    const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })
    return { ...user, ...{ token }, status: true }
}

exports.otpSend = async (req, res) => {
    try {
        //otp login//
        // const user = await userModel.findOne({ number: req.body.number }).lean()
        // console.log(user);

        //check user//
        // if (!user) return res.status(404).json({ message: "user  not  found" })

        //user find//
        const otp = await doSms(req.body.number)
        console.log(otp);
        console.log(req.body.number);
        res.json({ message: "otp send successfully", status: true })

    } catch (e) {
        res.json({ message: "Otp senting failed", status: false })
    }
}

exports.otpVerify = async (req, res) => {
    try {
        const verifyLogin = await otpVerify(req.body.number, req.body.otp)
        if (verifyLogin.valid) {
            res.status(200).json({ message: "Verified successfully", status: true })
        } else {
            res.json({ message: "Enter a  valid OTP", status: false })
        }

    } catch (e) {
        res.json({ message: e.message, status: false })
    }

}

exports.sendEmailOtp = async (req, res) => {
    try {
        //found user registered or not //
        const email = await userModel.findOne({ email: req.body.email })
        console.log(email);
        if (!email) return res.json({ message: "User not registered", status: false })

        const generateOtp = randomOtp();
        await otpModel.create({ email: req.body.email, otp: generateOtp })
        const mailOption = {
            to: req.body.email,
            title: "GLOOM OTP verification is :",
            html: emailTemplate(generateOtp),
        };

        transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                res.json({ message: "Something went wrong", status: false })
                console.log(err);
            } else {
                res.status(200).json({ message: "Otp send successfully", status: true })
            }
        });
    } catch (err) {
        res.json({ message: err.message, status: false })

    }
}

exports.verifyEmail = async (req, res) => {
    const otp = req.body.otp
    const emailOtpVerify = await otpModel.findOne({ email: req.body.email }).sort({ _id: -1 })
    if (emailOtpVerify) {
        if (otp == emailOtpVerify.otp) {
            //Otp Correct
            res.status(200).json({ message: "Verified successfully", status: true })
        } else {
            //Otp Wrong
            res.json({ message: "Enter a valid OTP ", status: false })
        }
    } else {
        //Otp Session Expired 
        res.json({ message: "Session expired", status: false })
    }

}

exports.changePassword = async (req, res) => {
    try {
        // Bcrypt password //
        const password = await bcrypt.hash(req.body.password, 10)

        //changed password //
        const changePassword = await userModel.updateOne({ email: req.body.email }, { $set: { password: password } })
        res.status(200).json({ message: "Password changed successfully", status: true })
    } catch (er) {
        res.json({ message: er.message, status: false })
    }
}


