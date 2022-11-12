const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
        user: "yoho.stream.chat@gmail.com",
        pass: "atbspqhxbghaierp",
    },
})

const generateRandomOtp = () => {
    const otp = parseInt(Math.random() * 10000);
    return otp;
};

module.exports.transporter = transporter;
module.exports.otp = generateRandomOtp;