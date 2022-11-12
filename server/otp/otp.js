
const { serviceId } = require("../config/app")
const config = require("../config/app")

const client = require("twilio")(config.accountId, config.authId)
module.exports = {
    doSms: (number) => {
        return new Promise(async (res, rej) => {
            const otp = await client.verify.services(serviceId).verifications.create({
                to: `+91${number}`,
                channel: "sms"
            })
            res(otp)
        })
    },
    otpVerify: (number, otp) => {
        return new Promise(async (res, rej) => {
            const verify = await client.verify.services(serviceId).verificationChecks.create({
                to: `+91${number}`,
                code: otp
            })
            res(verify)
        })
    }
}



